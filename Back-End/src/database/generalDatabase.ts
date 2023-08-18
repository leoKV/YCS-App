import pool from "../connections/database";

class GeneralDatabase{
    public async listarRoles(){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " SELECT idRol, nombre, clave"
                +" FROM tblRol WHERE estatus=? ",
                [true]
            );

        });
        return result;
    }

    public async listarCategorias(){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " SELECT idCategoria, nombre, descripcion"
                +" FROM tblCategoria "
            );

        });
        return result;
    }

    public async getProductos(){
        const result = await pool.then(async(connection)=>{
            return await connection.query(`
            SELECT p.*, c.nombre AS nombreCategoria,
            CONCAT(u.nombre, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreUsuario
            FROM tblProducto p
            INNER JOIN tblCategoria c ON p.idCategoria = c.idCategoria
            INNER JOIN tblUsuario u ON p.idRegistro = u.idUsuario
        `,);

        });
        return result;
    }
}
const dao = new GeneralDatabase();
export default dao;