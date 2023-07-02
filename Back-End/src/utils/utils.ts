import jwt from 'jsonwebtoken'
import keys from '../config/keys'
/**
 * @name Utils
 * @author Kevin Leonel Valdez Sánchez
 * @creation 27/96/2023
 */
class Utils{
    /**
     * @name generateJWT
     * @description TO DO
     * @param payload
     * @return string
     */
    public generateJWT(payload: any): string{
        var token = jwt.sign(payload, keys.secret.jwt, {expiresIn:'1h'});
        return token;
    }


    /**
     * @name verifyJWT
     * @description TO DO
     * @param token
     * @return any
     */
    public verifyJWT(token: any): any{
        var jwtPayload = jwt.verify(token, keys.secret.jwt);
        return jwtPayload;
    }
}
export const utils = new Utils()