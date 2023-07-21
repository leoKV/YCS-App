"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
const jwtCheck_1 = require("../middlewares/jwtCheck");
const validatorCheck_1 = require("../middlewares/validatorCheck");
const ProductoValidatorRules_1 = require("../validators/ProductoValidatorRules");
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Listar producto
        this.router.get("/", [jwtCheck_1.jwtCheck], productoController_1.productoController.listar);
        //Listar detalle del producto por el id
        this.router.get("/detalle", [jwtCheck_1.jwtCheck], productoController_1.productoController.listarDetalleByProductId);
        //Listar imagen del producto por el id del detalle
        this.router.get("/detalle/imagen", [jwtCheck_1.jwtCheck], productoController_1.productoController.listarImagenByProductDetailId);
        //Insertar producto
        this.router.post("/", (0, ProductoValidatorRules_1.insertValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.insertar);
        //Insertar detalle del producto
        this.router.post("/detalle", (0, ProductoValidatorRules_1.insertDetailValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.insertarDetalleProducto);
        //Insertar imagen del producto
        this.router.post("/detalle/imagen", (0, ProductoValidatorRules_1.insertImageValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.insertarImagenProducto);
        //Actualizar producto
        this.router.put("/", (0, ProductoValidatorRules_1.updateValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.actualizar);
        //Actualizar detalle del producto
        this.router.put("/detalle", (0, ProductoValidatorRules_1.updateDetailValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.actualizarDetalleProducto);
        //Actualizar imagen del producto
        this.router.put("/detalle/imagen", (0, ProductoValidatorRules_1.updateImageValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.actualizarImagenProducto);
        //Eliminar producto
        this.router.delete("/:idProducto", productoController_1.productoController.eliminar);
        //Eliminar detalle del producto
        this.router.delete("/detalle/:idDetalleProducto", productoController_1.productoController.eliminarDetalleProducto);
        //Eiminar imagen del producto
        this.router.delete("/detalle/imagen/:idImagen", productoController_1.productoController.eliminarImagenProducto);
    }
}
const producto = new ProductoRoutes();
exports.default = producto.router;
