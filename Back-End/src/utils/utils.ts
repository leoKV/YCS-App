import jwt from 'jsonwebtoken';
import keys from '../config/keys';

/*****************************************
 * @name Utils
 * @author Manuel Matehuala
 * @description 27/06/2023
 ****************************************/
class Utils {

    /*************************************
     * @name generateJWT
     * @description TO DO
     * @param payload
     * @return string
     ************************************/
    public generateJWT(payload: any): string{
        var token = jwt.sign(payload, keys.secret.jwt, { expiresIn : '1h' });

        return token;
    }

    /*************************************
     * @name verifyJWT
     * @description TO DO
     * @param token
     * @return any
     ************************************/
    public verifyJWT(token: any): string{
        var jwtPayload = <any>jwt.verify(token, keys.secret.jwt);
        

        return token;
    }
}
export const utils = new Utils();