import { Router } from "express";
/**
 * @name AuthRoutes
 * @author Kevin Leonel
 * @creation 13-06-2023
 */
class AuthRoutes{
    public router: Router;

    constructor() {
        this.router= Router();
    }
}
const authRoutes= new AuthRoutes();
export default authRoutes.router;
