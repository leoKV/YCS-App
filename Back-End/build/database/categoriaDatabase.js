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
class CategoriaDatabase {
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT * FROM tblCategoria");
            }));
            return result;
        });
    }
    insertar(nombre, descripcion, idRegistro) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default;
            // Verificar si el idRegistro está definido y es un número
            if (typeof idRegistro === "number") {
                const query = "INSERT INTO tblCategoria (nombre, descripcion, idRegistro) VALUES (?, ?, ?)";
                const result = yield connection.query(query, [nombre, descripcion, idRegistro]);
                return result;
            }
            else {
                throw new Error("El idRegistro es inválido");
            }
        });
    }
    actualizar(idCategoria, nombre, descripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const query = "UPDATE tblCategoria SET nombre = ?, descripcion = ? WHERE idCategoria = ?";
                return yield connection.query(query, [nombre, descripcion, idCategoria]);
            }));
            return result;
        });
    }
    eliminar(idCategoria) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const query = "DELETE FROM tblCategoria WHERE idCategoria = ?";
                return yield connection.query(query, [idCategoria]);
            }));
            return result;
        });
    }
}
const daoC = new CategoriaDatabase();
exports.default = daoC;
