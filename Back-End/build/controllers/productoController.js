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
exports.productoController = void 0;
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
                var producto = __rest(req.body, []);
                const result = yield productoDatabase_1.default.insertar(producto);
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
                var _a = req.body, { idProducto } = _a, producto = __rest(_a, ["idProducto"]);
                const result = yield productoDatabase_1.default.actualizar(producto, idProducto);
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
