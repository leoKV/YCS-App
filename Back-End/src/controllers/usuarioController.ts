import { Request, Response } from "express";
import dao from "../database/usuarioDatabase";
import { utils } from "../utils/utils";

/**
 * @name usuarioController
 * @author Kevin Leonel Valdez Sánchez
 * @creation 10-07-2023
 */
class UsuarioController{
    //Método para listar todos los usuarios de la tabal tblUsuario
    public async listar(req:Request, res:Response){
        try{
            const token = <string> req.headers["auth"];
            const data = utils.getPayload(token);

            var usuarios = await dao.listar(data.idUsuario);
            for(let usuario of usuarios){
                usuario.roles = await dao.listarRolByUserId(usuario.idUsuario);
            }
            return res.json(usuarios);

        }
        catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    //Método para insertar usuarios a la tabla tblUsuario
    public async insertar(req: Request, res: Response) {
        try {

            var { roles, ...usuario } = req.body;

            //Verificar el usuario
            const users = await dao.verificarEmail(usuario.email);
            if (users.length > 0) {
                return res.status(404).json({ mensaje: "El email ya está registrado" })
            }

            //Encriptar contraseña
            var encryptedPassword = await utils.hashContrasenia(usuario.contrasenia);
            usuario.contrasenia = encryptedPassword;

            //return res.json(usuario);

            const result = await dao.insertar(usuario);
            //return res.json(result);
            if (result.affectedRows > 0) {
                for (let rol of roles) {
                    rol.idUsuario = result.insertId;
                    var insertRol ={
                        idRol: rol.idRol,
                        idUsuario: rol.idUsuario
                    }
                    await dao.insertarRol(insertRol);
                }

                return res.json({ mensaje: "Usuario registrado correctamente" });
            } else {
                return res.status(505).json({ mensaje: "Ocurrió un error" });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }


    //Método para actualizar usuarios de la tabla tblUsuario
    public async actualizar(req: Request, res: Response) {
        try {
            var { roles, idUsuario, ...usuario } = req.body;

            // actualizar la información de los roles
            const resultRoles = await dao.eliminarRolByIdUsuario(idUsuario);

            for (let rol of roles) {

                var rolUsuario = {
                    idRol: rol.idRol,
                    idUsuario
                }
                await dao.insertarRol(rolUsuario);
            }

            const result = await dao.actualizar(usuario, idUsuario);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Usuario actualizado correctamente" })
            } else {
                return res.status(500).json({ mensaje: "ocurrió un error" })
            }


            return res.json(idUsuario);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    //Método para eliminar usuarios de la tabla tblUsuario
    public async eliminar(req:Request, res:Response){
        try{
            var idUsuario: number = parseInt(req.params.idUsuario) ;
            await dao.eliminarRolByIdUsuario(idUsuario);
            const result = await dao.eliminar(idUsuario);
            if(result.affectedRows > 0){
                return res.json({ mensaje: 'Usuario eliminado correctamente'});
            }else{
                return res.status(500).json({ mensaje:'Ocurrió un error'});
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }
}
export const usuarioController = new UsuarioController();