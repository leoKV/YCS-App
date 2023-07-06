import { Request, Response } from "express";
import dao from "../database/authDatabase";
import { utils } from "../utils/utils";

//npm i jsonwebtoken
//npm i @types/jsonwebtoken -D
/**
 * @name AuthController
 * @author Manuel Matehuala
 * @creation  13-06-2023
 */
class AuthController{
    public async login(req:Request, res:Response){
    
        try{
            const {email, contrasenia} = req.body;
            /* const auth={
                 email,
                 password
             }
             */
             // Obtener la información de los usuarios a partir de su "email"
             const users= await dao.getUserByEmail(email);
             // Realizar un ciclo "for" para obtener la información
             for(let user of users){
                // Validar la contraseña
                if(user.contrasenia == contrasenia){
                // Obtener los roles del usuario
                const roles = await dao.getUserByCveUsuario(user.cveUsuario);
                user.roles = roles;
                // Dentro del ciclo: Crear un modelo con la información
                const {contrasenia, fecha_Registro,... newUser} = user;
                // Generar un JWT (JsonWebToken)
                var token = utils.generateJWT(newUser);
                // Devolver la información
                return res.json({token, mensaje:"Autentificación correcta"});
                }
                else{
                    return res.status(404).json({mensaje: "El usuario y/o contraseña es incorrecto"});
                }
             }

        }catch(error){
            console.error(error);
            return res.status(500).json({mensaje: "Ocurrió un error"});
        }
    }
}
export const authController = new AuthController();