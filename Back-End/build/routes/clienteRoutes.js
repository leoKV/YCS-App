"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorCheck_1 = require("../middlewares/validatorCheck");
const clienteController_1 = require("../controllers/clienteController");
const testValidationRule_1 = require("../validators/testValidationRule");
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
        this.router.post("/", testValidationRule_1.insertClientValidationRules, [validatorCheck_1.validate], clienteController_1.clienteController.insertar);
    }
}
const cliente = new ClienteRoutes();
exports.default = cliente.router;
