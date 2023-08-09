import { Request, Response } from "express";
import dao from "../database/generalDatabase";

class GeneralController {
    public async listarRoles(req: Request, res: Response) {
        try {
            const roles = await dao.listarRoles();

            return res.json(roles);

        } catch (error) {
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }

    public async listarCategorias(req: Request, res: Response) {
        try {
            const categorias = await dao.listarCategorias();

            return res.json(categorias);

        } catch (error) {
            return res.status(500).json({ mensaje: "Ocurrió un error" });
        }
    }
}
export const generalController = new GeneralController();