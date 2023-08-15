"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationRules = exports.insertValidationRules = void 0;
const express_validator_1 = require("express-validator");
const insertValidationRules = () => {
    return [
    // body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
    //   .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
    // body("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
    // .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
    // body("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
    // .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
    // body("contrasenia").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo requerido")
    // .isLength({min:8,max:100}).withMessage("Rango Incorrecto"),
    // body("email").trim().not().isEmpty().withMessage("Campo requerido")
    // .isLength({min:10,max:50}).withMessage("Rango Incorrecto")
    // .isEmail().withMessage("Formato Incorrecto"),
    // body("telefono").trim().not().isEmpty().withMessage("Campo requerido"),
    // body("roles").isArray({min:1}).withMessage("Formato Incorrecto")
    ];
};
exports.insertValidationRules = insertValidationRules;
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
        (0, express_validator_1.body)("roles").isArray({ min: 1 }).withMessage("Formato Incorrecto")
    ];
};
exports.updateValidationRules = updateValidationRules;
