import pool from "../connections/database";

/**
 * @name ClienteDatabase
 * @author Manuel Matehuala
 * @creation  18-07-2023
 */
class ClienteDatabase {

    public async verificarEmail(email: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " SELECT idUsuario FROM tblUsuario WHERE email = ? ",
                [email]
            );
        });
        return result;
    }

    public async insertar(cliente: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" INSERT INTO tblUsuario SET ? ", [cliente]);
        });
        return result;
    }

    public async insertarRol(rol: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" INSERT INTO tblUsuarioRol SET ? ", [rol]);
        });
        return result;
    }

}
const dao = new ClienteDatabase();
export default dao;