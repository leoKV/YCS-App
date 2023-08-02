import connection from "../config/connection";
import pool from "../connections/database";

class ProductoDatabase {
    //Métodos para listar

    //Método para listar productos con el nombre de la categoría y el nombre del usuario
    public async listar() {
        const result = await pool.then(async (connection) => {
            return await connection.query(`
            SELECT p.*, c.nombre AS nombreCategoria,
            CONCAT(u.nombre, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreUsuario
            FROM tblProducto p
            INNER JOIN tblCategoria c ON p.idCategoria = c.idCategoria
            INNER JOIN tblUsuario u ON p.idRegistro = u.idUsuario
        `);
        });
        return result;
    }

    public async listarDetalleByProductId(idProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" SELECT * FROM tblDetalleProducto WHERE idProducto =? ", [idProducto]);
        });
        return result;
    }

    public async listarImagenByProductDetailId(idDetalleProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" SELECT * FROM tblImagenProducto WHERE idDetalleProducto =? ", [idDetalleProducto]);
        });
        return result;
    }

    //Métodos para insertar
    public async insertar(producto: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" INSERT INTO tblProducto SET ? ", [producto]);
        });
        return result;
    }

    public async insertarDetalleProducto(detalleProducto: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" INSERT INTO tblDetalleProducto SET ? ", [detalleProducto]);
        });
        return result;
    }

    public async insertarImagenProducto(imagenProducto: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" INSERT INTO tblImagenProducto SET ? ", [imagenProducto]);
        });
        return result;
    }

    public async insertarData(data: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query(" INSERT INTO tblImagenProducto SET ? ", [data]);
        });
        return result;
    }

    //Métodos para actualizar
    public async actualizar(producto: any, idProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " UPDATE tblProducto SET ? WHERE idProducto = ? ",
                [producto, idProducto]
            );
        });
        return result;
    }

    public async actualizarDetalleProducto(detalleProducto: any, idDetalleProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " UPDATE tblDetalleProducto SET ? WHERE idDetalleProducto = ? ",
                [detalleProducto, idDetalleProducto]
            );
        });
        return result;
    }

    public async actualizarImagenProducto(imagenProducto: any, idImagen: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " UPDATE tblImagenProducto SET ? WHERE idImagen = ? ",
                [imagenProducto, idImagen]
            )
        });
        return result;
    }

    //Métodos para eliminar
    public async eliminar(idProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tblProducto WHERE idProducto = ? ",
                [idProducto]
            );
        });
        return result;
    }

    public async eliminarDetalleProducto(idDetalleProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tblDetalleProducto WHERE idDetalleProducto = ? ",
                [idDetalleProducto]
            );
        });
        return result;
    }

    public async eliminarDetalleByProductId(idProducto: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tblDetalleProducto WHERE idProducto =? ",
                [idProducto]
            )
        });
        return result;
    }

    public async eliminarImagenProducto(idImagen: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                " DELETE FROM tblImagenProducto WHERE idImagen =? ",
                [idImagen]
            )
        });
        return result;
    }

}

const daoP = new ProductoDatabase();
export default daoP;