import { Imagen } from "./imagen.interface";
import { ProductoDetalleResponse } from "./producto.detalle.interface";



export interface ProductoResponse {
    idProducto: number;
    nombre: string;
    descripcion: string;
    idCategoria: number;
    idRegistro?: number;
    fecha_Registro?: Date;
    nombreCategoria: string;
    nombreUsuario: string;
    detalles?: ProductoDetalleResponse[];
    imagenes?: Imagen[];
    RutaImagen?: string;
}