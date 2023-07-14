import { Rol } from "../models/rol.interface";
export interface Perfil{
    idUsuario: number;
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    email:string;
    telefono:string;
    roles: Rol[];
}