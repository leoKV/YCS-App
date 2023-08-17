import { Router } from "express";
import { validate } from "../middlewares/validatorCheck";
import { clienteController } from "../controllers/clienteController";
import { insertClientValidationRules } from '../validators/testValidationRule';

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
        this.router.post("/", insertClientValidationRules, [validate], clienteController.insertar);
    }
}
const cliente = new ClienteRoutes();
export default cliente.router;