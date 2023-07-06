"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authDatabase_1 = __importDefault(require("../database/authDatabase"));
const utils_1 = require("../utils/utils");
//npm i jsonwebtoken
//npm i @types/jsonwebtoken -D
/**
 * @name AuthController
 * @author Manuel Matehuala
 * @creation  13-06-2023
 */
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, contrasenia } = req.body;
                /* const auth={
                     email,
                     password
                 }
                 */
                // Obtener la información de los usuarios a partir de su "email"
                const users = yield authDatabase_1.default.getUserByEmail(email);
                // Realizar un ciclo "for" para obtener la información
                for (let user of users) {
                    // Validar la contraseña
                    if (user.contrasenia == contrasenia) {
                        // Obtener los roles del usuario
                        const roles = yield authDatabase_1.default.getUserByCveUsuario(user.cveUsuario);
                        user.roles = roles;
                        // Dentro del ciclo: Crear un modelo con la información
                        const { contrasenia, fecha_Registro } = user, newUser = __rest(user, ["contrasenia", "fecha_Registro"]);
                        // Generar un JWT (JsonWebToken)
                        var token = utils_1.utils.generateJWT(newUser);
                        // Devolver la información
                        return res.json({ token, mensaje: "Autentificación correcta" });
                    }
                    else {
                        return res.status(404).json({ mensaje: "El usuario y/o contraseña es incorrecto" });
                    }
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.authController = new AuthController();
