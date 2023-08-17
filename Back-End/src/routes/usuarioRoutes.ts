import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
// import { insertUserValidationRules } from "../validators/UsuarioValidatorRules";
import { insertUserValidator, updateValidationRules } from '../validators/testValidationRule';
import { validate } from "../middlewares/validatorCheck";
import { jwtCheck } from "../middlewares/jwtCheck";

class UsuarioRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        //Listar
        this.router.get("/", [jwtCheck], usuarioController.listar);
        //Insertar
        this.router.post("/", insertUserValidator(), [jwtCheck, validate], usuarioController.insertar);
        //Actualizar
        this.router.put("/", updateValidationRules(), [jwtCheck, validate], usuarioController.actualizar);
        //Eliminar
        this.router.delete("/:idUsuario", usuarioController.eliminar);
    }
}
const usuario = new UsuarioRoutes();
export default usuario.router;