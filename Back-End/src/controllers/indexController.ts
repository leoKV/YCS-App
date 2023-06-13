import { Request,Response } from "express";
/**
 * @name IndexController
 * @author Kevin Leonel
 * @creation  12-06-2023
 */
class IndexController{
    /**
     * @name index
     * @description Prueba de conexión hacia el servidor
     * @param req 
     * @param res 
     * @returns Response<any, Record<string, any>>
     */
    public async index(req:Request, res:Response):Promise<Response<any, Record<string,any>>>{
        try{
            return res.json("El Back-End se encuentra en /api");
        }catch(error:any){
            console.error(error)
            return res.status(500).json({mensaje:"Ocurrió un error"});
        }
    }
}

export const indexController = new IndexController();