import { Router } from "express";
import { productoController } from "../controllers/productoController";
import { jwtCheck } from "../middlewares/jwtCheck";
import { validate } from "../middlewares/validatorCheck";
import { insertDetailValidationRules, insertImageValidationRules, insertValidationRules, updateDetailValidationRules, updateImageValidationRules, updateValidationRules } from "../validators/ProductoValidatorRules";

class ProductoRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Listar producto
        this.router.get("/",[jwtCheck],productoController.listar)
        //Listar detalles de productos
        this.router.get("/detalle",[jwtCheck],productoController.listarDetalleByProduct)
         //Listar producto por el id
         this.router.get("/:idProducto", [jwtCheck], productoController.listarByProductId)
        //Listar detalle del producto por el id
        this.router.get("/detalle/:idProducto", [jwtCheck], productoController.listarDetalleByProductId)
        //Listar imagen del producto por el id del detalle
        this.router.get("/detalle/imagen",[jwtCheck],productoController.listarImagenByProductDetailId)

        //Insertar producto
        this.router.post("/",insertValidationRules(),[jwtCheck,validate],productoController.insertar)
        //Insertar detalle del producto
        this.router.post("/detalle",insertDetailValidationRules(),[jwtCheck,validate],productoController.insertarDetalleProducto)
        //Insertar imagen del producto
        this.router.post("/detalle/imagen/:idDetalleProducto",[jwtCheck,validate],productoController.subirArchivos)
    
        //Actualizar producto
        this.router.put("/",updateValidationRules(),[jwtCheck,validate],productoController.actualizar)
        //Actualizar detalle del producto
        this.router.put("/detalle",updateDetailValidationRules(),[jwtCheck,validate],productoController.actualizarDetalleProducto)
        //Actualizar imagen del producto
        this.router.put("/detalle/imagen",updateImageValidationRules(),[jwtCheck,validate],productoController.actualizarImagenProducto)
    
        //Eliminar producto
        this.router.delete("/:idProducto",productoController.eliminar)
        //Eliminar detalle del producto
        this.router.delete("/detalle/:idDetalleProducto",productoController.eliminarDetalleProducto)
        //Eiminar imagen del producto
        this.router.delete("/detalle/imagen/:idImagen",productoController.eliminarImagenProducto)
    
    }
}
const producto = new ProductoRoutes();
export default producto.router;