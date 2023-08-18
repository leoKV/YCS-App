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
const constants_1 = __importDefault(require("../config/constants"));
class ProductoDatabase {
    //Métodos para listar
    //Método para listar productos con el nombre de la categoría y el nombre del usuario
    listar() {
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
    listarByProductId(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const imgPrefix = `${constants_1.default.CONSTANTS.UPLOADS_PATH_ENDPOINT}/${idProducto}/`;
                return yield connection.query(`
            SELECT p.*, c.nombre AS nombreCategoria,
            CONCAT(u.nombre, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreUsuario, CONCAT("${imgPrefix}", ip.rutaImagen) AS RutaImagen
            FROM tblProducto p
            INNER JOIN tblCategoria c ON p.idCategoria = c.idCategoria
            INNER JOIN tblUsuario u ON p.idRegistro = u.idUsuario
            INNER JOIN tblDetalleProducto dp ON dp.idProducto = p.idProducto
            INNER JOIN tblImagenProducto ip ON ip.idDetalleProducto = dp.idDetalleProducto
        `, [idProducto]);
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
    listarDetalleByProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT * FROM tblDetalleProducto ");
            }));
            return result;
        });
    }
    listarImagenByProductDetailId(idDetalleProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const imgPrefix = constants_1.default.CONSTANTS.UPLOADS_PATH_ENDPOINT;
                return yield connection
                    .query(`SELECT img.idImagen, CONCAT("${imgPrefix}",ip.idProducto,"/", img.rutaImagen) as rutaImagen, img.idDetalleProducto FROM tblImagenProducto as img INNER JOIN tblDetalleProducto ip ON img.idDetalleProducto = ip.idDetalleProducto WHERE ip.idDetalleProducto =?`, [idDetalleProducto]);
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
    insertarData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tblImagenProducto SET ? ", [data]);
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
