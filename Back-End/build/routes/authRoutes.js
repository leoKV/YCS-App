"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validatorCheck_1 = require("../middlewares/validatorCheck");
const loginValidatorRule_1 = require("../validators/loginValidatorRule");
/**
 * @name AuthRoutes
 * @author Kevin Leonel
 * @creation 13-06-2023
 */
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", (0, loginValidatorRule_1.loginValidatorRules)(), [validatorCheck_1.validate], authController_1.authController.login);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
