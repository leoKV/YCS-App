import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoDetalleResponse } from '../../../../shared/models/producto.detalle.interface';
import { environment } from '@env/environment.development';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Imagen } from '../../../../shared/models/imagen.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoDetalleService {

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  // Obtener los detalles de un producto por su ID
  getDetalleProducto(idProducto: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/producto/detalle/${idProducto}`, { headers: { "requireToken": "true" } })
      .pipe(
        tap(response => console.log("Detalles de producto recibidos:", response)), // Se muestra la respuesta del servidor en la consola
        catchError((error) => this.handlerError(error)) // Captura y manejo de errores
      );
  }

  // Actualizar los detalles de un producto
  updateDetalle(productoDetalle: ProductoDetalleResponse): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/producto/detalle`, productoDetalle, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error))); // Captura y manejo de errores
  }

  // Eliminar un detalle de producto por su ID
  delete(idDetalleProducto: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/producto/detalle/${idDetalleProducto}`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error))); // Captura y manejo de errores
  }

  // Insertar imágenes asociadas a un detalle de producto
  insertarImagenes(imagenes: Imagen[]): Observable<any> {
    const url = `${environment.API_URL}/producto/detalle/imagen`;
    return this.http.post(url, imagenes, { headers: { "requireToken": "true" } });
  }

  // Eliminar una imagen asociada a un detalle de producto por su ID
  eliminarImagen(idImagen: number): Observable<any> {
    const url = `${environment.API_URL}/detalle/imagen/${idImagen}`;
    return this.http.delete(url, { headers: { "requireToken": "true" } });
  }

  // Manejar errores de la API
  handlerError(error: any): Observable<never> {
    console.log("Error");
    let errorMessage = "Ocurrió un error";
    if (error.error) {
      errorMessage = `Error: ${error.error.mensaje}`;
    }
    // Mostrar el mensaje de error en una snackbar
    this.snackBar.open(errorMessage, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
    // Devolver un observable con un error
    return throwError(() => new Error(errorMessage));
  }
}