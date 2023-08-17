"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationRules = exports.insertValidationRules = void 0;
const express_validator_1 = require("express-validator");
const insertValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 500 }).withMessage("Rango Incorrecto"),
    ];
};
exports.insertValidationRules = insertValidationRules;
const updateValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 500 }).withMessage("Rango Incorrecto"),
    ];
};
exports.updateValidationRules = updateValidationRules;
