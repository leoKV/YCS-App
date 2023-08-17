import { body } from "express-validator";

export const insertUserValidationRules = () => {
  return [
    body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
  ]
}