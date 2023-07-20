import { Router } from "express";
import { productoController } from "../controllers/productoController";
import { jwtCheck } from "../middlewares/jwtCheck";
import { validate } from "../middlewares/validatorCheck";
import { insertValidationRules, updateValidationRules } from "../validators/ProductoValidatorRules";

class ProductoRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Listar
        this.router.get("/",[jwtCheck],productoController.listar)
        //Insertar
        this.router.post("/",insertValidationRules(),[jwtCheck,validate],productoController.insertar)
        //Actualizar
        this.router.put("/",updateValidationRules(),[jwtCheck,validate],productoController.actualizar)
        //Eliminar
        this.router.delete("/:idProducto",productoController.eliminar);
    }
}
const producto = new ProductoRoutes();
export default producto.router;