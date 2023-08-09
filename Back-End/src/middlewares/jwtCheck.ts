import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { utils } from "../utils/utils";
import keys from "../config/keys";

export const jwtCheck = (req: Request, res: Response,next: NextFunction) =>{
    try{
        const token = <string> req.headers["auth"];
        let payload = utils.getPayload(token);
        

        const newToken  = jwt.sign(payload, keys.secret.jwt, {expiresIn: '1h'});
        res.setHeader("auth", newToken);
        next();

    }catch(error){
        return res.status(401).send("Not Authorized");
    }
}