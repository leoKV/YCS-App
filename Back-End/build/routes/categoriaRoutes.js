"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = require("../controllers/categoriaController");
const jwtCheck_1 = require("../middlewares/jwtCheck");
const UsuarioValidatorRules_1 = require("../validators/UsuarioValidatorRules");
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Listar
        this.router.get("/", [jwtCheck_1.jwtCheck], categoriaController_1.categoriaController.listar);
        // Insertar
        this.router.post("/", (0, UsuarioValidatorRules_1.insertValidationRules)(), categoriaController_1.categoriaController.insertar);
        // Actualizar
        this.router.put("/", (0, UsuarioValidatorRules_1.insertValidationRules)(), categoriaController_1.categoriaController.actualizar);
        // Eliminar
        this.router.delete("/:idCategoria", categoriaController_1.categoriaController.eliminar);
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;
