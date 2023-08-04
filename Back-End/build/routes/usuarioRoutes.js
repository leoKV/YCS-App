"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Listar
        this.router.get("/", usuarioController_1.usuarioController.listar);
        //Insertar
        this.router.post("/", usuarioController_1.usuarioController.insertar);
        //Actualizar
        this.router.put("/", usuarioController_1.usuarioController.actualizar);
        //Eliminar
        this.router.delete("/", usuarioController_1.usuarioController.eliminar);
    }
}
const usuario = new UsuarioRoutes();
exports.default = usuario.router;
