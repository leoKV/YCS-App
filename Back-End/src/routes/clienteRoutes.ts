import { Router } from "express";
import { insertClientValidationRules } from "../validators/UsuarioValidatorRules";
import { validate } from "../middlewares/validatorCheck";
import { clienteController } from "../controllers/clienteController";

/**
 * @name ClienteRoutes
 * @author Manuel Matehuala
 * @creation  18-07-2023
 */
class ClienteRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        //Insertar
        this.router.post("/", [validate], clienteController.insertar);
    }
}
const cliente = new ClienteRoutes();
export default cliente.router;