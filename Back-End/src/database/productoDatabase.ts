import pool from "../connections/database";

class ProductoDatabase{
    public async listar(/*idProducto: number*/){
        const result =await pool.then(async (connection)=>{
           // return await connection.query(" SELECT * FROM tblProducto WHERE idProducto = ? ",[idProducto] );
           return await connection.query(" SELECT * FROM tblProducto ");
        });
        return result;
    }

    public async insertar(producto: any){
        const result= await pool.then(async(connection)=>{
            return await connection.query(" INSERT INTO tblProducto SET ? ",[producto]);
        });
        return result;
    }

    public async actualizar(producto:any, idProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " UPDATE tblProducto SET ? WHERE idProducto = ? ",
                [producto, idProducto]
            );
        });
        return result;
    }

    public async eliminar(idProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblProducto WHERE idProducto = ? ",
                [ idProducto ]
            );
        });
        return result;
    }

}

const dao = new ProductoDatabase();
export default dao;