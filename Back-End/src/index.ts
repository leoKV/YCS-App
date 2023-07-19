import express,{ Application } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import authRoutes from "./routes/authRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import generalRoutes from "./routes/generalRoutes";
import clienteRoutes from "./routes/clienteRoutes";

class Server{

    public app:Application = express();

    constructor(){
        this.app= express();
        this.config();
        this.routes();
    }

    /***************************************************
     * @name config
     * @description Configuración inicial del sevidor
     * @returns void
     ***************************************************/
    private config(): void{
        // Realizar la configuración del puerto(host || local)
        this.app.set("port",3000);

        // Mostrar las peticiones en la terminal (morgan)
        // process.env_NODE_ENV =1, production, 2.development
        var env= process.env.NODE_ENV || "development";
        
        if(env == "development") this.app.use(morgan("dev"));

        //Configurar el intercambio de recursos de origen(cors)
        this.app.use(cors());

        //Configurar la entrada de datos por medio de peticiones(json)
        this.app.use(express.json());

        //Deshabilitar la opción de envio de URL corruptas
        this.app.use(express.urlencoded({extended: false}))
    }

    /***************************************************
     * @name routes
     * @description Configuración inicial del sevidor
     * @returns void
     ***************************************************/
    private routes():void{
        this.app.use("/",indexRoutes);
        this.app.use("/api/auth",authRoutes);
        this.app.use("/api/usuario",usuarioRoutes);
        this.app.use("/api/cliente",clienteRoutes);
        this.app.use("/api/general",generalRoutes);
    }

    /***************************************************
     * @name start
     * @description Inicialización del servicio
     * @returns void
     ***************************************************/
    public start():void{
        //agregar un listener con un callback para ejecutar el servicio 
        this.app.listen(this.app.get("port"), ()=>{
            console.log("Server on port",this.app.get("port"))
        });
    }
}

const server= new Server();
server.start();