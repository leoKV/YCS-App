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
class GeneralDatabase {
    listarRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT idRol, nombre, clave"
                    + " FROM tblRol WHERE estatus=? ", [true]);
            }));
            return result;
        });
    }
    listarCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT idCategoria, nombre, descripcion"
                    + " FROM tblCategoria ");
            }));
            return result;
        });
    }
    getProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(`
            SELECT p.*, c.nombre AS nombreCategoria,
            CONCAT(u.nombre, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreUsuario
            FROM tblProducto p
            INNER JOIN tblCategoria c ON p.idCategoria = c.idCategoria
            INNER JOIN tblUsuario u ON p.idRegistro = u.idUsuario
        `);
            }));
            return result;
        });
    }
}
const dao = new GeneralDatabase();
exports.default = dao;
