import { Router } from "express";
import { productoController } from "../controllers/productoController";
import { jwtCheck } from "../middlewares/jwtCheck";
import { validate } from "../middlewares/validatorCheck";
import { insertDetailValidationRules, insertValidationRules, updateDetailValidationRules, updateValidationRules } from "../validators/ProductoValidatorRules";

class ProductoRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Listar producto
        this.router.get("/",[jwtCheck],productoController.listar)
        //Listar detalle del producto por el id
        this.router.get("/detalle",[jwtCheck],productoController.listarDetalleByProductId)
        //Insertar producto
        this.router.post("/",insertValidationRules(),[jwtCheck,validate],productoController.insertar)
        //Insertar detalle del producto
        this.router.post("/detalle",insertDetailValidationRules(),[jwtCheck,validate],productoController.insertarDetalleProducto)
        //Actualizar producto
        this.router.put("/",updateValidationRules(),[jwtCheck,validate],productoController.actualizar)
        //Actualizar detalle del producto
        this.router.put("/detalle",updateDetailValidationRules(),[jwtCheck,validate],productoController.actualizarDetalleProducto)
        //Eliminar producto
        this.router.delete("/:idProducto",productoController.eliminar)
        //Eliminar detalle del producto
        this.router.delete("/detalle/:idDetalleProducto",productoController.eliminarDetalleProducto)
    }
}
const producto = new ProductoRoutes();
export default producto.router;