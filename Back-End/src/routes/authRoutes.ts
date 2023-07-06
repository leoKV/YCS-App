import { Router } from "express";
import { authController } from "../controllers/authController";
import { validate } from "../middlewares/validatorCheck";
import { loginValidatorRules } from "../validators/loginValidatorRule";
/**
 * @name AuthRoutes
 * @author Manuel Matehuala
 * @creation 13-06-2023
 */
class AuthRoutes{
    public router: Router;

    constructor() {
        this.router= Router();
        this.config();
    }

    private config(){
        this.router.post("/",loginValidatorRules(), [validate], authController.login);
    }
}
const authRoutes= new AuthRoutes();
export default authRoutes.router;