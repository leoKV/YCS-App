import {body} from 'express-validator';
export const loginValidatorRules = () =>{
    //email.trim() != null
    //emai.trim() == ""
    //emai.trim().lenght() 3 <> 10
    return [
        body("email").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:10,max:50}).withMessage("Rango Incorrecto"),
        body("email").isEmail().withMessage("Formato de email incorrecto"),
        body("contrasenia").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:8,max:15}).withMessage("Rango Incorrecto")
    ]
}