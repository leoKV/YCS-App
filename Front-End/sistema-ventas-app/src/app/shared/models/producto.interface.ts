import { Categoria } from "./categoria.interface";

export interface ProductoResponse {
    idProducto: number;
    nombre: string;
    descripcion: string;
    idCategoria: number;
    idRegistro?: number;
    fecha_Registro?: Date;
    nombreCategoria? : string;
}