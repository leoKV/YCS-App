"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = require("../controllers/categoriaController");
// import { insertValidationRules, } from "../validators/UsuarioValidatorRules";
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Listar
        this.router.get("/", categoriaController_1.categoriaController.listar);
        // Insertar
        this.router.post("/", categoriaController_1.categoriaController.insertar);
        // Actualizar
        this.router.put("/:idCategoria", categoriaController_1.categoriaController.actualizar);
        // Eliminar
        this.router.delete("/:idCategoria", categoriaController_1.categoriaController.eliminar);
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;
