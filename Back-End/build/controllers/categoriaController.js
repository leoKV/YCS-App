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
exports.categoriaController = void 0;
const utils_1 = require("../utils/utils");
const categoriaDatabase_1 = __importDefault(require("../database/categoriaDatabase"));
class CategoriaController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield categoriaDatabase_1.default.listar();
                res.json(categorias);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    //Insertar productos
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                // Crear un objeto con los datos de la nueva categoría y el idRegistro del usuario
                const newCategoria = {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    idRegistro: data.idUsuario
                };
                const result = yield categoriaDatabase_1.default.insertar(newCategoria.nombre, newCategoria.descripcion, newCategoria.idRegistro);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: "Categoría registrada correctamente" });
                }
                else {
                    return res.status(500).json({ mensaje: "Ocurrió un error al registrar la categoría" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCategoria } = req.params; // idCategoria debe ser un string
                const { nombre, descripcion } = req.body;
                const result = yield categoriaDatabase_1.default.actualizar(idCategoria, nombre, descripcion);
                if (result.affectedRows > 0) {
                    res.json({ mensaje: "Categoría actualizada correctamente" });
                }
                else {
                    res.status(500).json({ mensaje: "Ocurrió un error al actualizar la categoría" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCategoria } = req.params;
                const result = yield categoriaDatabase_1.default.eliminar(idCategoria);
                if (result.affectedRows > 0) {
                    res.json({ mensaje: "Categoría eliminada correctamente" });
                }
                else {
                    res.status(500).json({ mensaje: "Ocurrió un error al eliminar la categoría" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.categoriaController = new CategoriaController();
