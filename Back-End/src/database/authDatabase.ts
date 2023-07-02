import connection from "../config/connection";
import pool from "../connections/database";

/**
 * @name AuthDatabase
 * @author Kevin Leonel
 * @creation 27-06-2023
 */
class AuthDatabase{
    /**
     * @name getUserByEmail
     * @description TO DO
     * @params email
     * @return Promise<any>
     */
    public async getUserByEmail(email:string){
        const result = await pool.then(async (connection) =>{
            return await connection.query(
                "SELECT * FROM tblUsuario WHERE email = ?",
                [email]
            );
        });
        return result;
    }


     /**
     * @name getUserByCveUsuario
     * @description TO DO
     * @params cveUsuario
     * @return Promise<any>
     */
     public async getUserByCveUsuario(clave:string){
        const result = await pool.then(async (connection) =>{
            return await connection.query(
                "SELECT r.idRol, r.nombre, r.clave"
                +"FROM tblUsuarioRol ru"
                +"JOIN tblRol r ON r.idRol = ru.idRol"
                +"WHERE ru.idUsuario = ? AND r.estatus=?",
                [clave, true]
            );
        });
    }
}
const dao = new AuthDatabase()
export default dao;