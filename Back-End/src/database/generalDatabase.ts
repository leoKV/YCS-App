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
}
const dao = new GeneralDatabase();
export default dao;