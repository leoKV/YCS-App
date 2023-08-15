"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
// import { insertValidationRules, updateValidationRules } from "../validators/UsuarioValidatorRules";
// import { validate } from "../middlewares/validatorCheck";
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
        // this.router.post("/",insertValidationRules(),[ jwtCheck,validate ],usuarioController.insertar);
        //Actualizar
        // this.router.put("/",updateValidationRules(),[ jwtCheck,validate ],usuarioController.actualizar);
        //Eliminar
        // this.router.delete("/:idUsuario",usuarioController.eliminar);
    }
}
const usuario = new UsuarioRoutes();
exports.default = usuario.router;
