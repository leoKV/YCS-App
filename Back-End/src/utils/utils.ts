import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import bcrypt from 'bcryptjs';
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
     * @name getPayload
     * @description TO DO
     * @param token
     * @return any
     */
    public getPayload(token: string): any{
        var jwtPayload =<any>jwt.verify(token, keys.secret.jwt);

        const {iat,exp,...data} = jwtPayload;
        return data;
    }

    /**
     * @name hashContrasenia
     * @description TO DO
     * @param password
     * @return Promise<any>
     */
    public async hashContrasenia(contrasenia: string){
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(contrasenia, salt);
    }

    /**
     * @name checkContrasenia
     * @description TO DO
     * @param password
     * @param encryptedContrasenia
     * @return Promise<any>
     */
    public async checkContrasenia(contrasenia: string, encryptedContrasenia: string){
        return await bcrypt.compareSync(contrasenia,encryptedContrasenia);

    }

}
export const utils = new Utils()