"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserValidationRules = void 0;
const express_validator_1 = require("express-validator");
const insertUserValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.insertUserValidationRules = insertUserValidationRules;
