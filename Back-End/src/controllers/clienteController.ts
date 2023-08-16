import { Request, Response } from "express";
import dao from "../database/clienteDatabase";
import { utils } from "../utils/utils";

/**
 * @name ClienteController
 * @author Manuel Matehuala
 * @creation  18-07-2023
 */
class ClienteController {
    public async insertar(req: Request, res: Response) {
        try {

            var { ...cliente } = req.body;

            //Verificar el usuario
            const users = await dao.verificarEmail(cliente.email);
            if (users.length > 0) {
                return res.status(404).json({ mensaje: "El email ya está registrado" })
            }

            //Encriptar contraseña
            var encryptedPassword = await utils.hashContrasenia(cliente.contrasenia);
            cliente.contrasenia = encryptedPassword;

            const result = await dao.insertar(cliente);

            if (result.affectedRows > 0) {
                //Obtener el id del usuario (cliente) recién insertado.
                const idUsuario = result.insertId;

                const rolUsuario = {
                    idRol: 3,
                    idUsuario: idUsuario
                }

                const resultado = await dao.insertarRol(rolUsuario);
                if (resultado.affectedRows > 0) {
                    return res.json({ mensaje: "Los datos se guardaron correctamente" });
                } else {
                    return res.status(404).json({ mensaje: "Ocurrió un error" });
                }
            } else {
                return res.status(505).json({ mensaje: "Ocurrió un error" });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }
}
export const clienteController = new ClienteController();