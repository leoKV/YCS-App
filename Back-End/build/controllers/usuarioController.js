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
exports.usuarioController = void 0;
const usuarioDatabase_1 = __importDefault(require("../database/usuarioDatabase"));
const utils_1 = require("../utils/utils");
/**
 * @name usuarioController
 * @author Kevin Leonel Valdez Sánchez
 * @creation 10-07-2023
 */
class UsuarioController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const data = utils_1.utils.getPayload(token);
                var usuarios = yield usuarioDatabase_1.default.listar(data.idUsuario);
                for (let usuario of usuarios) {
                    usuario.roles = yield usuarioDatabase_1.default.listarRolByUserId(usuario.idUsuario);
                }
                return res.json(usuarios);
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
                var _a = req.body, { roles } = _a, usuario = __rest(_a, ["roles"]);
                //Verificar el usuario
                const users = yield usuarioDatabase_1.default.verificarEmail(usuario.email);
                if (users.length > 0) {
                    return res.status(404).json({ mensaje: "El email ya está registrado" });
                }
                //Encriptar contraseña
                var encryptedPassword = yield utils_1.utils.hashContrasenia(usuario.contrasenia);
                usuario.contrasenia = encryptedPassword;
                //return res.json(usuario);
                const result = yield usuarioDatabase_1.default.insertar(usuario);
                //return res.json(result);
                if (result.affectedRows > 0) {
                    for (let rol of roles) {
                        rol.idUsuario = result.insertId;
                        var insertRol = {
                            idRol: rol.idRol,
                            idUsuario: rol.idUsuario
                        };
                        yield usuarioDatabase_1.default.insertarRol(insertRol);
                    }
                    return res.json({ mensaje: "Usuario registrado correctamente" });
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
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var _a = req.body, { roles, idUsuario } = _a, usuario = __rest(_a, ["roles", "idUsuario"]);
                // actualizar la información de los roles
                const resultRoles = yield usuarioDatabase_1.default.eliminarRolByIdUsuario(idUsuario);
                if (resultRoles.affectedRows > 0) {
                    for (let rol of roles) {
                        rol.idUsuario = idUsuario;
                        yield usuarioDatabase_1.default.insertarRol(rol);
                    }
                    const result = yield usuarioDatabase_1.default.actualizar(usuario, idUsuario);
                    if (result.affectedRows > 0) {
                        return res.json({ mensaje: "Usuario actualizado correctamente" });
                    }
                    else {
                        return res.status(500).json({ mensaje: "ocurrió un error" });
                    }
                }
                return res.json(idUsuario);
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
                var idUsuario = parseInt(req.params.idUsuario);
                yield usuarioDatabase_1.default.eliminarRolByIdUsuario(idUsuario);
                const result = yield usuarioDatabase_1.default.eliminar(idUsuario);
                if (result.affectedRows > 0) {
                    return res.json({ mensaje: 'Usuario eliminado correctamente' });
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
exports.usuarioController = new UsuarioController();
