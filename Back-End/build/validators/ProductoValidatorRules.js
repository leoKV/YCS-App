"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageValidationRules = exports.insertImageValidationRules = exports.updateDetailValidationRules = exports.insertDetailValidationRules = exports.updateValidationRules = exports.insertValidationRules = void 0;
const express_validator_1 = require("express-validator");
//Reglas para insertar un producto
const insertValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 150 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 500 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("idCategoria").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.insertValidationRules = insertValidationRules;
//Reglas para actualizar un producto
const updateValidationRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 150 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 10, max: 500 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("idCategoria").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.updateValidationRules = updateValidationRules;
//Reglas para insertar un detalle de producto
const insertDetailValidationRules = () => {
    return [
        (0, express_validator_1.body)("talla").trim().not().isEmpty().withMessage("Campo requerido"),
        //.isLength({min:1,max:3}).withMessage("Rango Incorrecto").toUpperCase(),
        (0, express_validator_1.body)("color").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 10 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("precioUnitario").trim().not().isEmpty().withMessage("Campo requerido").isFloat()
            .isNumeric().withMessage("Solo se admite un valor númerico"),
        (0, express_validator_1.body)("stock").trim().not().isEmpty().withMessage("Campo requerido")
            .isNumeric().withMessage("Solo se admite un valor númerico")
    ];
};
exports.insertDetailValidationRules = insertDetailValidationRules;
//Reglas para actualizar un detalle de producto
const updateDetailValidationRules = () => {
    return [
        (0, express_validator_1.body)("talla").trim().not().isEmpty().withMessage("Campo requerido"),
        //.isLength({min:1,max:3}).withMessage("Rango Incorrecto").toUpperCase(),
        (0, express_validator_1.body)("color").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 3, max: 10 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("precioUnitario").trim().not().isEmpty().withMessage("Campo requerido").isFloat()
            .isNumeric().withMessage("Solo se admite un valor númerico"),
        (0, express_validator_1.body)("stock").trim().not().isEmpty().withMessage("Campo requerido")
            .isNumeric().withMessage("Solo se admite un valor númerico")
    ];
};
exports.updateDetailValidationRules = updateDetailValidationRules;
//Reglas para insertar una imagen del producto
const insertImageValidationRules = () => {
    return [
        (0, express_validator_1.body)("rutaImagen").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("idDetalleProducto").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.insertImageValidationRules = insertImageValidationRules;
//Reglas para actualizar una imagen del producto
const updateImageValidationRules = () => {
    return [
        (0, express_validator_1.body)("idImagen").trim().not().isEmpty().withMessage("Campo requerido"),
        (0, express_validator_1.body)("rutaImagen").trim().not().isEmpty().withMessage("Campo requerido")
            .isLength({ min: 5 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("idDetalleProducto").trim().not().isEmpty().withMessage("Campo requerido")
    ];
};
exports.updateImageValidationRules = updateImageValidationRules;
