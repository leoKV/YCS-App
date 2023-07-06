"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
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
    generateJWT(payload) {
        var token = jsonwebtoken_1.default.sign(payload, keys_1.default.secret.jwt, { expiresIn: '1h' });
        return token;
    }
    /*************************************
     * @name verifyJWT
     * @description TO DO
     * @param token
     * @return any
     ************************************/
    verifyJWT(token) {
        var jwtPayload = jsonwebtoken_1.default.verify(token, keys_1.default.secret.jwt);
        return token;
    }
}
exports.utils = new Utils();
