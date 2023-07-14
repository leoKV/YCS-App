import { Rol } from "./rol.interface";

export interface UsuarioResponse{
    idUsuario:number;
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    email:string;
    fecha_Registro:Date;
    roles:Rol[];
}