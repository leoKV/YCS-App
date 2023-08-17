"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = require("../controllers/categoriaController");
const categoriasValidatorRules_1 = require("../validators/categoriasValidatorRules");
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Listar
        this.router.get("/", categoriaController_1.categoriaController.listar);
        // Insertar
        this.router.post("/", categoriasValidatorRules_1.insertValidationRules, categoriaController_1.categoriaController.insertar);
        // Actualizar
        this.router.put("/:idCategoria", categoriasValidatorRules_1.updateValidationRules, categoriaController_1.categoriaController.actualizar);
        // Eliminar
        this.router.delete("/:idCategoria", categoriaController_1.categoriaController.eliminar);
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;
