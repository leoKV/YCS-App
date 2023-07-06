import pool from "../connections/database";

/**
 * @name UsuarioDatabase
 * @author Manuel Matehuala
 * @creation 27-06-2023
 */
class UsuarioDatabase {

    public async insertar(cliente: any): Promise<any> {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO tblusuario SET ? ", [cliente]);
        });

        return result;
    }

    public async insertarRol(idUsuario: any): Promise<any> {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO tblusuariorol SET ? ", [idUsuario]);
        });

        return result;
    }

}
const dao = new UsuarioDatabase();
export default dao;