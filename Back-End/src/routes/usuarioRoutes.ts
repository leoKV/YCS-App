import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

class UsuarioRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Listar
        this.router.get("/",usuarioController.listar);
        //Insertar
        this.router.post("/",usuarioController.insertar);
        //Actualizar
        this.router.put("/",usuarioController.actualizar);
        //Eliminar
        this.router.delete("/",usuarioController.eliminar);
    }
}
const usuario = new UsuarioRoutes();
export default usuario.router;