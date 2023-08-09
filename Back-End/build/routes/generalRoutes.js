"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generalController_1 = require("../controllers/generalController");
const jwtCheck_1 = require("../middlewares/jwtCheck");
class GeneralRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/roles", [jwtCheck_1.jwtCheck], generalController_1.generalController.listarRoles);
        this.router.get("/categorias", [jwtCheck_1.jwtCheck], generalController_1.generalController.listarCategorias);
    }
}
const generalRoutes = new GeneralRoutes();
exports.default = generalRoutes.router;
