import { Request, Response } from "express";
import dao from "../database/usuarioDatabase";
import { utils } from "../utils/utils";

/**
 * @name
 * @author
 * @creation
 */
class UsuarioController{
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

    public async actualizar(req: Request, res: Response) {
        try {
            var { roles, idUsuario, ...usuario } = req.body;

            // actualizar la información de los roles
            const resultRoles = await dao.eliminarRolByIdUsuario(idUsuario);

            if (resultRoles.affectedRows > 0) {
                for (let rol of roles) {
                    rol.idUsuario = idUsuario;
                    await dao.insertarRol(rol);
                }

                const result = await dao.actualizar(usuario, idUsuario);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Usuario actualizado correctamente" })
                } else {
                    return res.status(500).json({ mensaje: "ocurrió un error" })
                }
            }


            return res.json(idUsuario);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

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