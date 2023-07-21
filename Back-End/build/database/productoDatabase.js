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
class ProductoDatabase {
    //Métodos para listar
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                // return await connection.query(" SELECT * FROM tblProducto WHERE idProducto = ? ",[idProducto] );
                return yield connection.query(" SELECT * FROM tblProducto ");
            }));
            return result;
        });
    }
    listarDetalleByProductId(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT * FROM tblDetalleProducto WHERE idProducto =? ", [idProducto]);
            }));
            return result;
        });
    }
    listarImagenByProductDetailId(idDetalleProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT * FROM tblImagenProducto WHERE idDetalleProducto =? ", [idDetalleProducto]);
            }));
            return result;
        });
    }
    //Métodos para insertar
    insertar(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tblProducto SET ? ", [producto]);
            }));
            return result;
        });
    }
    insertarDetalleProducto(detalleProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tblDetalleProducto SET ? ", [detalleProducto]);
            }));
            return result;
        });
    }
    insertarImagenProducto(imagenProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tblImagenProducto SET ? ", [imagenProducto]);
            }));
            return result;
        });
    }
    //Métodos para actualizar
    actualizar(producto, idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tblProducto SET ? WHERE idProducto = ? ", [producto, idProducto]);
            }));
            return result;
        });
    }
    actualizarDetalleProducto(detalleProducto, idDetalleProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tblDetalleProducto SET ? WHERE idDetalleProducto = ? ", [detalleProducto, idDetalleProducto]);
            }));
            return result;
        });
    }
    actualizarImagenProducto(imagenProducto, idImagen) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tblImagenProducto SET ? WHERE idImagen = ? ", [imagenProducto, idImagen]);
            }));
            return result;
        });
    }
    //Métodos para eliminar
    eliminar(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tblProducto WHERE idProducto = ? ", [idProducto]);
            }));
            return result;
        });
    }
    eliminarDetalleProducto(idDetalleProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tblDetalleProducto WHERE idDetalleProducto = ? ", [idDetalleProducto]);
            }));
            return result;
        });
    }
    eliminarDetalleByProductId(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tblDetalleProducto WHERE idProducto =? ", [idProducto]);
            }));
            return result;
        });
    }
    eliminarImagenProducto(idImagen) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tblImagenProducto WHERE idImagen =? ", [idImagen]);
            }));
            return result;
        });
    }
}
const daoP = new ProductoDatabase();
exports.default = daoP;
