import { body } from 'express-validator';

export const insertUserValidator = () => {
    return [
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
    ]
}