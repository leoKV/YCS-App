import { body } from "express-validator"

export const insertValidationRules=() =>{
    return[
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:3,max:150}).withMessage("Rango Incorrecto"),
        body("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
          .isLength({min:10,max:500}).withMessage("Rango Incorrecto"),
        body("idCategoria").trim().not().isEmpty().withMessage("Campo requerido"),
        body("idRegistro").trim().not().isEmpty().withMessage("Campo requerido")   
    ]
}

export const updateValidationRules=() =>{
    return[
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:3,max:150}).withMessage("Rango Incorrecto"),
        body("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
          .isLength({min:20,max:500}).withMessage("Rango Incorrecto"),
        body("idCategoria").trim().not().isEmpty().withMessage("Campo requerido"),
        body("idRegistro").trim().not().isEmpty().withMessage("Campo requerido") 
    ]
}