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
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
/**
 * @name IndexController
 * @author Kevin Leonel
 * @creation  12-06-2023
 */
class IndexController {
    /**
     * @name index
     * @description Prueba de conexión hacia el servidor
     * @param req
     * @param res
     * @returns Response<any, Record<string, any>>
     */
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json("El Back-End se encuentra en /api");
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.indexController = new IndexController();
