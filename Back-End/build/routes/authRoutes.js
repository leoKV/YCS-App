"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * @name AuthRoutes
 * @author Kevin Leonel
 * @creation 13-06-2023
 */
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
