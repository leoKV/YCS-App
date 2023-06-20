import { Request, Response } from "express";

/**
 * @name AuthController
 * @author Kevin Leonel
 * @creation  13-06-2023
 */
class AuthController{
    public async login(req:Request, res:Response){
        const {email, password,...rest} = req.body;

        const auth={
            email,
            password
        }

        res.json({auth});
    }

}

export const authController = new AuthController();