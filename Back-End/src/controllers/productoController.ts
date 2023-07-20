import { Request, Response } from "express";
import { utils } from "../utils/utils";
import dao from "../database/productoDatabase";

class ProductoController{
    //Listar productos
    public async listar(req:Request, res: Response){
        try{
            const token = <string> req.headers["auth"];
           // const data = utils.getPayload(token);

            var productos = await dao.listar(/*data.idProducto*/);
            return res.json(productos);
        }catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    //Insertar productos
    public async insertar(req:Request, res: Response){
        try{
            var {...producto} = req.body

            const result = await dao.insertar(producto);

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
            var {idProducto,...producto} = req.body;
            const result = await dao.actualizar(producto, idProducto);
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
            const result = await dao.eliminar(idProducto);
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