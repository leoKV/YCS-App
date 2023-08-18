import { body } from "express-validator"

//Reglas para insertar un producto
export const insertValidationRules = () => {
  return [
    body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 10, max: 150 }).withMessage("Rango Incorrecto"),
    body("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 10, max: 500 }).withMessage("Rango Incorrecto"),
    body("idCategoria").trim().not().isEmpty().withMessage("Campo requerido")
  ]
}
//Reglas para actualizar un producto
export const updateValidationRules = () => {
  return [
    body("nombre").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 10, max: 150 }).withMessage("Rango Incorrecto"),
    body("descripcion").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 10, max: 500 }).withMessage("Rango Incorrecto"),
    body("idCategoria").trim().not().isEmpty().withMessage("Campo requerido")
  ]
}

//Reglas para insertar un detalle de producto
export const insertDetailValidationRules = () => {
  return [
    body("talla").trim().not().isEmpty().withMessage("Campo requerido"),
    //.isLength({min:1,max:3}).withMessage("Rango Incorrecto").toUpperCase(),
    body("color").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 3, max: 10 }).withMessage("Rango Incorrecto"),
    body("precioUnitario").trim().not().isEmpty().withMessage("Campo requerido").isFloat()
      .isNumeric().withMessage("Solo se admite un valor númerico"),
    body("stock").trim().not().isEmpty().withMessage("Campo requerido")
      .isNumeric().withMessage("Solo se admite un valor númerico")
  ]
}

//Reglas para actualizar un detalle de producto
export const updateDetailValidationRules = () => {
  return [
    body("talla").trim().not().isEmpty().withMessage("Campo requerido"),
    //.isLength({min:1,max:3}).withMessage("Rango Incorrecto").toUpperCase(),
    body("color").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 3, max: 10 }).withMessage("Rango Incorrecto"),
    body("precioUnitario").trim().not().isEmpty().withMessage("Campo requerido").isFloat()
      .isNumeric().withMessage("Solo se admite un valor númerico"),
    body("stock").trim().not().isEmpty().withMessage("Campo requerido")
      .isNumeric().withMessage("Solo se admite un valor númerico")
  ]
}


//Reglas para insertar una imagen del producto
export const insertImageValidationRules = () => {
  return [
    body("rutaImagen").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 5 }).withMessage("Rango Incorrecto"),
    body("idDetalleProducto").trim().not().isEmpty().withMessage("Campo requerido")
  ]
}

//Reglas para actualizar una imagen del producto
export const updateImageValidationRules = () => {
  return [
    body("idImagen").trim().not().isEmpty().withMessage("Campo requerido"),
    body("rutaImagen").trim().not().isEmpty().withMessage("Campo requerido")
      .isLength({ min: 5 }).withMessage("Rango Incorrecto"),
    body("idDetalleProducto").trim().not().isEmpty().withMessage("Campo requerido")
  ]
}