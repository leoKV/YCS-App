"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserValidator = void 0;
const express_validator_1 = require("express-validator");
const insertUserValidator = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.insertUserValidator = insertUserValidator;
