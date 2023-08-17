"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertValidationRules = void 0;
const express_validator_1 = require("express-validator");
const insertValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido").isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
    ];
};
exports.insertValidationRules = insertValidationRules;
