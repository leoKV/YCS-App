"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
// import { insertUserValidationRules } from "../validators/UsuarioValidatorRules";
const testValidationRule_1 = require("../validators/testValidationRule");
const validatorCheck_1 = require("../middlewares/validatorCheck");
const jwtCheck_1 = require("../middlewares/jwtCheck");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Listar
        this.router.get("/", [jwtCheck_1.jwtCheck], usuarioController_1.usuarioController.listar);
        //Insertar
        this.router.post("/", (0, testValidationRule_1.insertUserValidator)(), [jwtCheck_1.jwtCheck, validatorCheck_1.validate], usuarioController_1.usuarioController.insertar);
        //Actualizar
        this.router.put("/", [jwtCheck_1.jwtCheck], usuarioController_1.usuarioController.actualizar);
        //Eliminar
        this.router.delete("/:idUsuario", usuarioController_1.usuarioController.eliminar);
    }
}
const usuario = new UsuarioRoutes();
exports.default = usuario.router;
