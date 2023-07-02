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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../connections/database"));
/**
 * @name AuthDatabase
 * @author Kevin Leonel
 * @creation 27-06-2023
 */
class AuthDatabase {
    /**
     * @name getUserByEmail
     * @description TO DO
     * @params email
     * @return Promise<any>
     */
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT * FROM tblUsuario WHERE email = ?", [email]);
            }));
            return result;
        });
    }
    /**
    * @name getUserByCveUsuario
    * @description TO DO
    * @params cveUsuario
    * @return Promise<any>
    */
    getUserByCveUsuario(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT r.idRol, r.nombre, r.clave"
                    + "FROM tblUsuarioRol ru"
                    + "JOIN tblRol r ON r.idRol = ru.idRol"
                    + "WHERE ru.idUsuario = ? AND r.estatus=?", [clave, true]);
            }));
        });
    }
}
const dao = new AuthDatabase();
exports.default = dao;
