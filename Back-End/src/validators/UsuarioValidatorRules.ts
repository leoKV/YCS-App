import { body } from "express-validator";

export const insertValidationRules = () => {
  return [
    body("nombre").trim().not().isEmpty().withMessage("Campo requerido").isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
  ]
}