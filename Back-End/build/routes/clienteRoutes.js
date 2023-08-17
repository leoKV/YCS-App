"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorCheck_1 = require("../middlewares/validatorCheck");
const clienteController_1 = require("../controllers/clienteController");
/**
 * @name ClienteRoutes
 * @author Manuel Matehuala
 * @creation  18-07-2023
 */
class ClienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Insertar
        this.router.post("/", [validatorCheck_1.validate], clienteController_1.clienteController.insertar);
    }
}
const cliente = new ClienteRoutes();
exports.default = cliente.router;
