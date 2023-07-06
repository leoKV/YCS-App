"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const loginValidatorRules = () => {
    //email.trim() != null
    //emai.trim() == ""
    //emai.trim().lenght() 3 <> 10
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5, max: 50 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5, max: 50 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5, max: 50 }).withMessage("Rango incorrecto"),
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("email").isEmail().withMessage("Formato de email incorrecto"),
        (0, express_validator_1.body)("contrasenia").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 8, max: 15 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("contrasenia").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
            .withMessage('Formato de contrasenia incorrecto'),
        (0, express_validator_1.body)("telefono").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.loginValidatorRules = loginValidatorRules;
