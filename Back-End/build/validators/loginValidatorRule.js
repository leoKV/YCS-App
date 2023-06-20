"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const loginValidatorRules = () => {
    //email.trim() != null
    //emai.trim() == ""
    //emai.trim().lenght() 3 <> 10
    return [
        (0, express_validator_1.body)("email").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("email").isEmail().withMessage("Formato de email incorrecto"),
        (0, express_validator_1.body)("password").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 8, max: 15 }).withMessage("Rango Incorrecto")
    ];
};
exports.loginValidatorRules = loginValidatorRules;
