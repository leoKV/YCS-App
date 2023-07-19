"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const generalRoutes_1 = __importDefault(require("./routes/generalRoutes"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    /***************************************************
     * @name config
     * @description Configuración inicial del sevidor
     * @returns void
     ***************************************************/
    config() {
        // Realizar la configuración del puerto(host || local)
        this.app.set("port", 3000);
        // Mostrar las peticiones en la terminal (morgan)
        // process.env_NODE_ENV =1, production, 2.development
        var env = process.env.NODE_ENV || "development";
        if (env == "development")
            this.app.use((0, morgan_1.default)("dev"));
        //Configurar el intercambio de recursos de origen(cors)
        this.app.use((0, cors_1.default)());
        //Configurar la entrada de datos por medio de peticiones(json)
        this.app.use(express_1.default.json());
        //Deshabilitar la opción de envio de URL corruptas
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    /***************************************************
     * @name routes
     * @description Configuración inicial del sevidor
     * @returns void
     ***************************************************/
    routes() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/usuario", usuarioRoutes_1.default);
        this.app.use("/api/cliente", clienteRoutes_1.default);
        this.app.use("/api/general", generalRoutes_1.default);
    }
    /***************************************************
     * @name start
     * @description Inicialización del servicio
     * @returns void
     ***************************************************/
    start() {
        //agregar un listener con un callback para ejecutar el servicio 
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
