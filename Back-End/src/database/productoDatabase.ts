import connection from "../config/connection";
import pool from "../connections/database";

class ProductoDatabase{
    //Métodos para listar
    public async listar(){
        const result =await pool.then(async (connection)=>{
           // return await connection.query(" SELECT * FROM tblProducto WHERE idProducto = ? ",[idProducto] );
           return await connection.query(" SELECT * FROM tblProducto ");
        });
        return result;
    }

    public async listarDetalleByProductId(idProducto:number){
        const result = await pool.then(async (connection)=>{
            return await connection.query(" SELECT * FROM tblDetalleProducto WHERE idProducto =? ",[idProducto]);
        });
        return result;
    }

    public async listarImagenByProductDetailId(idDetalleProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(" SELECT * FROM tblImagenProducto WHERE idDetalleProducto =? ",[idDetalleProducto]);
        });
        return result;
    }

    //Métodos para insertar
    public async insertar(producto: any){
        const result= await pool.then(async(connection)=>{
            return await connection.query(" INSERT INTO tblProducto SET ? ",[producto]);
        });
        return result;
    }

    public async insertarDetalleProducto(detalleProducto:any){
        const result = await pool.then(async(connection)=>{
            return await connection.query(" INSERT INTO tblDetalleProducto SET ? ",[detalleProducto]);
        });
        return result;
    }

    public async insertarImagenProducto(imagenProducto:any){
        const result = await pool.then(async(connection)=>{
            return await connection.query(" INSERT INTO tblImagenProducto SET ? ",[ imagenProducto ]);
        });
        return result;
    }

    //Métodos para actualizar
    public async actualizar(producto:any, idProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " UPDATE tblProducto SET ? WHERE idProducto = ? ",
                [producto, idProducto]
            );
        });
        return result;
    }

    public async actualizarDetalleProducto(detalleProducto:any, idDetalleProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " UPDATE tblDetalleProducto SET ? WHERE idDetalleProducto = ? ",
                [detalleProducto,idDetalleProducto]
            );
        });
        return result;
    }

    public async actualizarImagenProducto(imagenProducto:any,idImagen:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " UPDATE tblImagenProducto SET ? WHERE idImagen = ? ",
                [imagenProducto,idImagen]
            )
        });
        return result;
    }

    //Métodos para eliminar
    public async eliminar(idProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblProducto WHERE idProducto = ? ",
                [ idProducto ]
            );
        });
        return result;
    }

    public async eliminarDetalleProducto(idDetalleProducto:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblDetalleProducto WHERE idDetalleProducto = ? ",
                [ idDetalleProducto ]
            );
        });
        return result;
    }

    public async eliminarDetalleByProductId(idProducto:number){
        const result = await  pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblDetalleProducto WHERE idProducto =? ",
                [ idProducto ]
            )
        });
        return result;
    }

    public async eliminarImagenProducto(idImagen:number){
        const result = await pool.then(async(connection)=>{
            return await connection.query(
                " DELETE FROM tblImagenProducto WHERE idImagen =? ",
                [ idImagen ]
            )
        });
        return result;
    }

}

const daoP = new ProductoDatabase();
export default daoP;