import { Request, Response } from "express";
import { utils } from "../utils/utils";
import daoP from "../database/productoDatabase";
import dao from "../database/usuarioDatabase";

class ProductoController{
    //Listar productos
    public async listar(req:Request, res: Response){
        try{
            
            const token = <string> req.headers["auth"];
           // const data = utils.getPayload(token);

            var productos = await daoP.listar(/*data.idProducto*/);
            return res.json(productos);
        }catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    //Insertar productos
    public async insertar(req:Request, res: Response){
        try{
            const token = <string> req.headers["auth"];
            const data = utils.getPayload(token);
            //var {...producto} = req.body
            var producto = req.body
            var newProducto = {
                nombre:producto.nombre,
                descripcion:producto.descripcion,
                idCategoria:producto.idCategoria,
                idRegistro:data.idUsuario
            }

            const result = await daoP.insertar(newProducto);

            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Producto registrado correctamente" }); 
            } else {
                return res.status(505).json({ mensaje: "Ocurrió un error" });
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    //Actualizar productos
    public async actualizar(req:Request, res: Response){
        try{
            const token = <string> req.headers["auth"];
            const data = utils.getPayload(token);
            var producto = req.body
            var updateProducto = {
                nombre:producto.nombre,
                descripcion:producto.descripcion,
                idCategoria:producto.idCategoria,
                idRegistro:data.idUsuario
            }
            
            //var {idProducto,...producto} = req.body;
            const result = await daoP.actualizar(updateProducto, producto.idProducto);
            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Producto actualizado correctamente" })
            } else {
                return res.status(500).json({ mensaje: "ocurrió un error" })
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    //Eliminar productos
    public async eliminar(req:Request, res: Response){
        try{
            var idProducto: number = parseInt(req.params.idProducto) ;
            const result = await daoP.eliminar(idProducto);
            if(result.affectedRows > 0){
                return res.json({ mensaje: 'Producto eliminado correctamente'});
            }else{
                return res.status(500).json({ mensaje:'Ocurrió un error'});
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }
}

export const productoController = new ProductoController();