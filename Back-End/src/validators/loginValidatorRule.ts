import {body} from 'express-validator';
export const loginValidatorRules = () =>{
    //email.trim() != null
    //emai.trim() == ""
    //emai.trim().lenght() 3 <> 10
    return [
        body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:5,max:50}).withMessage("Rango incorrecto"),
        body("apellidoPaterno").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:5,max:50}).withMessage("Rango incorrecto"),
        body("apellidoMaterno").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:5,max:50}).withMessage("Rango incorrecto"),
        body("email").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:10,max:50}).withMessage("Rango Incorrecto"),
        body("email").isEmail().withMessage("Formato de email incorrecto"),
        body("contrasenia").trim().not().isEmpty().withMessage("Campo requerido")
        .isLength({min:8,max:15}).withMessage("Rango Incorrecto"),
        body("contrasenia").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
        .withMessage('Formato de contrasenia incorrecto'),
        body("telefono").trim().not().isEmpty().withMessage("Campo requerido")
    ]
}