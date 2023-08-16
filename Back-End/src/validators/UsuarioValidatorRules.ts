import {body} from "express-validator";

export const insertValidationRules = () => {
    return[
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

export const updateValidationRules =() =>{
    return[
      body("idUsuario").isNumeric().withMessage("Formato Incorrecto"),
      body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
      body("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
      body("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({min:3,max:50}).withMessage("Rango Incorrecto"),
      body("email").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({min:10,max:50}).withMessage("Rango Incorrecto")
      .isEmail().withMessage("Formato Incorrecto"),
      body("roles").isArray({min:1}).withMessage("Formato Incorrecto")
    ]
}