"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = require("../controllers/categoriaController");
const UsuarioValidatorRules_1 = require("../validators/UsuarioValidatorRules");
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Listar
        this.router.get("/", categoriaController_1.categoriaController.listar);
        // Insertar
        this.router.post("/", (0, UsuarioValidatorRules_1.insertValidationRules)(), categoriaController_1.categoriaController.insertar);
        // Actualizar
        this.router.put("/:idCategoria", (0, UsuarioValidatorRules_1.updateValidationRules)(), categoriaController_1.categoriaController.actualizar);
        // Eliminar
        this.router.delete("/:idCategoria", categoriaController_1.categoriaController.eliminar);
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;
