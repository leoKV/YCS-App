import { Router } from "express";
import { generalController } from "../controllers/generalController";
import { jwtCheck } from "../middlewares/jwtCheck";

class GeneralRoutes{
    public router:Router;
    constructor(){
        this.router= Router();
        this.config();
    }

    private config(){
        this.router.get("/roles",[jwtCheck],generalController.listarRoles);
    }
}

const generalRoutes = new GeneralRoutes();
export default generalRoutes.router;