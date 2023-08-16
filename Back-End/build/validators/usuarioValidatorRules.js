"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationRules = exports.insertClientValidationRules = exports.insertValidationRules = void 0;
const express_validator_1 = require("express-validator");
const insertValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("contrasenia").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo requerido")
            .isLength({ min: 8, max: 100 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto")
            .isEmail().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("telefono").trim().not().isEmpty().withMessage("Campo requerido"),
        (0, express_validator_1.body)("roles").isArray({ min: 1 }).withMessage("Formato Incorrecto")
    ];
};
exports.insertValidationRules = insertValidationRules;
const insertClientValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 4, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("contrasenia")
            .trim()
            .notEmpty().withMessage("Campo requerido")
            .isLength({ min: 8, max: 15 }).withMessage("Rango Incorrecto")
            .matches(/[A-Z]/).withMessage("Debe contener al menos una letra mayúscula")
            .matches(/[a-z]/).withMessage("Debe contener al menos una letra minúscula")
            .matches(/\d/).withMessage("Debe contener al menos un número")
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Debe contener al menos un carácter especial"),
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto")
            .isEmail().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("telefono").trim().not().isEmpty().withMessage("Campo requerido").custom(value => /^\d+$/.test(value)).withMessage("Formato inválido")
            .isLength({ min: 10, max: 10 }).withMessage("Rango Incorrecto"),
    ];
};
exports.insertClientValidationRules = insertClientValidationRules;
const updateValidationRules = () => {
    return [
        (0, express_validator_1.body)("idUsuario").isNumeric().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto")
            .isEmail().withMessage("Formato Incorrecto"),
        (0, express_validator_1.body)("telefono").trim().not().isEmpty().withMessage("Campo requerido"),
        (0, express_validator_1.body)("roles").isArray({ min: 1 }).withMessage("Formato Incorrecto")
    ];
};
exports.updateValidationRules = updateValidationRules;
