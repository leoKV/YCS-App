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
exports.usuarioController = void 0;
const usuarioDatabase_1 = __importDefault(require("../database/usuarioDatabase"));
/**
 * @name UsuarioController
 * @author Manuel Matehuala
 * @creation 27/06/2023
 */
class UsuarioController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json("Listar");
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = req.body;
                if (cliente.contrasenia !== cliente.contraseniaConfirm) {
                    return res.status(404).json({ mensaje: "Las contraseñas no coinciden" });
                }
                else {
                    const newCliente = {
                        nombre: cliente.nombre,
                        apellidoPaterno: cliente.apellidoPaterno,
                        apellidoMaterno: cliente.apellidoMaterno,
                        contrasenia: cliente.contrasenia,
                        email: cliente.email,
                        telefono: cliente.telefono,
                        estatus: 1
                    };
                    const result = yield usuarioDatabase_1.default.insertar(newCliente);
                    if (result.affectedRows > 0) {
                        //Obtener el id del usuario (cliente) recién insertado.
                        const idUsuario = result.insertId;
                        const rolUsuario = {
                            idRol: 1,
                            idUsuario: idUsuario
                        };
                        const resultado = yield usuarioDatabase_1.default.insertarRol(rolUsuario);
                        if (resultado.affectedRows > 0) {
                            return res.json({ mensaje: "Los datos se guardaron correctamente" });
                        }
                        else {
                            return res.status(404).json({ mensaje: "Ocurrió un error" });
                        }
                    }
                    else {
                        return res.status(404).json({ mensaje: "Ocurrió un error" });
                    }
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
                return res.json("Actualizar");
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json("Eliminar");
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
