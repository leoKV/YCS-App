import { Request, Response } from "express";
import dao from "../database/usuarioDatabase";

/**
 * @name UsuarioController
 * @author Manuel Matehuala
 * @creation 27/06/2023
 */
class UsuarioController {
    public async listar(req: Request, res: Response) {
        try {
            return res.json("Listar");
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    public async insertar(req: Request, res: Response) {
        try {
            const cliente = req.body;

            if (cliente.contrasenia !== cliente.contraseniaConfirm) {
                return res.status(404).json({ mensaje: "Las contraseñas no coinciden" });
            } else {
                const newCliente = {
                    nombre: cliente.nombre,
                    apellidoPaterno: cliente.apellidoPaterno,
                    apellidoMaterno: cliente.apellidoMaterno,
                    contrasenia: cliente.contrasenia,
                    email: cliente.email,
                    telefono: cliente.telefono,
                    estatus: 1
                }
                const result = await dao.insertar(newCliente);

                if (result.affectedRows > 0) {
                    //Obtener el id del usuario (cliente) recién insertado.
                    const idUsuario = result.insertId;

                    const rolUsuario = {
                        idRol: 1,
                        idUsuario: idUsuario
                    }

                    const resultado = await dao.insertarRol(rolUsuario);

                    if (resultado.affectedRows > 0) {
                        return res.json({ mensaje: "Los datos se guardaron correctamente" });
                    } else {
                        return res.status(404).json({ mensaje: "Ocurrió un error" });
                    }
                } else {
                    return res.status(404).json({ mensaje: "Ocurrió un error" });
                }
            }

        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {
            return res.json("Actualizar");
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    public async eliminar(req: Request, res: Response) {
        try {
            return res.json("Eliminar");
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }
}
export const usuarioController = new UsuarioController();