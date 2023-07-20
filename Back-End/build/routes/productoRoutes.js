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
        //Listar
        this.router.get("/", [jwtCheck_1.jwtCheck], productoController_1.productoController.listar);
        //Insertar
        this.router.post("/", (0, ProductoValidatorRules_1.insertValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.insertar);
        //Actualizar
        this.router.put("/", (0, ProductoValidatorRules_1.updateValidationRules)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], productoController_1.productoController.actualizar);
        //Eliminar
        this.router.delete("/:idProducto", productoController_1.productoController.eliminar);
    }
}
const producto = new ProductoRoutes();
exports.default = producto.router;
