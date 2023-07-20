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
exports.productoController = void 0;
const utils_1 = require("../utils/utils");
const productoDatabase_1 = __importDefault(require("../database/productoDatabase"));
class ProductoController {
    //Listar productos
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                // const data = utils.getPayload(token);
                var productos = yield productoDatabase_1.default.listar( /*data.idProducto*/);
                return res.json(productos);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Insertar productos
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                //var {...producto} = req.body
                var producto = req.body;
                var newProducto = {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    idCategoria: producto.idCategoria,
                    idRegistro: data.idUsuario
                };
                const result = yield productoDatabase_1.default.insertar(newProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Producto registrado correctamente" });
                }
                else {
                    return res.status(505).json({ mensaje: "Ocurrió un error" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Actualizar productos
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                var producto = req.body;
                var updateProducto = {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    idCategoria: producto.idCategoria,
                    idRegistro: data.idUsuario
                };
                //var {idProducto,...producto} = req.body;
                const result = yield productoDatabase_1.default.actualizar(updateProducto, producto.idProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Producto actualizado correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "ocurrió un error" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Eliminar productos
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var idProducto = parseInt(req.params.idProducto);
                const result = yield productoDatabase_1.default.eliminar(idProducto);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: 'Producto eliminado correctamente' });
                }
                else {
                    return res.status(500).json({ mensaje: 'Ocurrió un error' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.productoController = new ProductoController();
