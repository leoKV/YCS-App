import { body } from 'express-validator';

export const insertUserValidator = () => {
    return [
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
                  .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
                body("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
                  .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
                body("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
                  .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
                body("contrasenia").trim().not().isEmpty().custom(value => !/\s/.test(value)).withMessage("Campo requerido")
                  .isLength({min:8,max:100}).withMessage("Rango Incorrecto"),
                body("email").trim().not().isEmpty().withMessage("Campo requerido")
                  .isLength({min:10,max:50}).withMessage("Rango Incorrecto")
                  .isEmail().withMessage("Formato Incorrecto"),
                body("telefono").trim().not().isEmpty().withMessage("Campo requerido"),
                body("roles").isArray({min:1}).withMessage("Formato Incorrecto")
           ]
        }
        
        export const insertClientValidationRules = () => {
          return [
            body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 4, max: 50 }).withMessage("Rango Incorrecto"),
            body("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 5, max: 50 }).withMessage("Rango Incorrecto"),
            body("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 5, max: 50 }).withMessage("Rango Incorrecto"),
            body("contrasenia")
              .trim()
              .notEmpty().withMessage("Campo requerido")
              .isLength({ min: 8, max: 15 }).withMessage("Rango Incorrecto")
              .matches(/[A-Z]/).withMessage("Debe contener al menos una letra mayúscula")
              .matches(/[a-z]/).withMessage("Debe contener al menos una letra minúscula")
              .matches(/\d/).withMessage("Debe contener al menos un número")
              .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Debe contener al menos un carácter especial"),
            body("email").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto")
              .isEmail().withMessage("Formato Incorrecto"),
            body("telefono").trim().not().isEmpty().withMessage("Campo requerido").custom(value => /^\d+$/.test(value)).withMessage("Formato inválido")
              .isLength({ min: 10, max: 10 }).withMessage("Rango Incorrecto"),
          ]
        }
        
        export const updateValidationRules = () => {
          return [
            body("idUsuario").isNumeric().withMessage("Formato Incorrecto"),
            body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
            body("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
            body("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 3, max: 50 }).withMessage("Rango Incorrecto"),
            body("email").trim().not().isEmpty().withMessage("Campo requerido")
              .isLength({ min: 10, max: 50 }).withMessage("Rango Incorrecto")
              .isEmail().withMessage("Formato Incorrecto"),
            body("telefono").trim().not().isEmpty().withMessage("Campo requerido"),
            body("roles").isArray({ min: 1 }).withMessage("Formato Incorrecto")
          ]
        }