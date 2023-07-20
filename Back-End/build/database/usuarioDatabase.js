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
//import connection from "../config/connection";
const database_1 = __importDefault(require("../connections/database"));
class UsuarioDatabase {
    listar(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT idUsuario, nombre, apellidoPaterno,apellidoMaterno,email,fecha_Registro "
                    + " FROM tblUsuario WHERE idUsuario !=? ", [idUsuario]);
            }));
            return result;
        });
    }
    obtenerUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT idUsuario"
                    + " FROM tblUsuario WHERE idUsuario =? ", [idUsuario]);
            }));
            return result;
        });
    }
    listarRolByUserId(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT r.* "
                    + " FROM tblUsuarioRol ru"
                    + " JOIN tblRol r ON r.idRol = ru.idRol "
                    + " WHERE ru.idUsuario =? ", [idUsuario]);
            }));
            return result;
        });
    }
    verificarEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT idUsuario FROM tblUsuario WHERE email = ? ", [email]);
            }));
            return result;
        });
    }
    insertar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tblUsuario SET ? ", [usuario]);
            }));
            return result;
        });
    }
    actualizar(usuario, idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tblUsuario SET ? WHERE idUsuario = ? ", [usuario, idUsuario]);
            }));
            return result;
        });
    }
    eliminar(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tblUsuario WHERE idUsuario = ? ", [idUsuario]);
            }));
            return result;
        });
    }
    eliminarRolByIdUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tblUsuarioRol WHERE idUsuario = ? ", [idUsuario]);
            }));
            return result;
        });
    }
    insertarRol(rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tblUsuarioRol SET ? ", [rol]);
            }));
            return result;
        });
    }
}
const dao = new UsuarioDatabase();
exports.default = dao;
