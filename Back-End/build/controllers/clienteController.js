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
exports.clienteController = void 0;
const clienteDatabase_1 = __importDefault(require("../database/clienteDatabase"));
const utils_1 = require("../utils/utils");
/**
 * @name ClienteController
 * @author Manuel Matehuala
 * @creation  18-07-2023
 */
class ClienteController {
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cliente = __rest(req.body, []);
                //Verificar el usuario
                const users = yield clienteDatabase_1.default.verificarEmail(cliente.email);
                if (users.length > 0) {
                    return res.status(404).json({ mensaje: "El email ya está registrado" });
                }
                //Encriptar contraseña
                var encryptedPassword = yield utils_1.utils.hashContrasenia(cliente.contrasenia);
                cliente.contrasenia = encryptedPassword;
                const result = yield clienteDatabase_1.default.insertar(cliente);
                if (result.affectedRows > 0) {
                    //Obtener el id del usuario (cliente) recién insertado.
                    const idUsuario = result.insertId;
                    const rolUsuario = {
                        idRol: 3,
                        idUsuario: idUsuario
                    };
                    const resultado = yield clienteDatabase_1.default.insertarRol(rolUsuario);
                    if (resultado.affectedRows > 0) {
                        return res.json({ mensaje: "Los datos se guardaron correctamente" });
                    }
                    else {
                        return res.status(404).json({ mensaje: "Ocurrió un error" });
                    }
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
}
exports.clienteController = new ClienteController();
