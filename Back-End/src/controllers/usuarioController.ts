import { Request, Response } from "express";

/**
 * @name
 * @author
 * @creation
 */
class UsuarioController{
    public async listar(req:Request, res:Response){
        try{
            return res.json("Listar");
        }
        catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    public async insertar(req:Request, res:Response){
        try{
            return res.json("Insertar");
        }
        catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    public async actualizar(req:Request, res:Response){
        try{
            return res.json("Actualizar");
        }
        catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }

    public async eliminar(req:Request, res:Response){
        try{
            return res.json("Eliminar");
        }
        catch(error){
            console.error(error);
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }
}
export const usuarioController = new UsuarioController();