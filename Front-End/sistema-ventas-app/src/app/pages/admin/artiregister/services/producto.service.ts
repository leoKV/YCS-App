// Importar módulos y componentes necesarios
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoResponse } from '../../../../shared/models/producto.interface';
import { environment } from '@env/environment.development';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ProductoDetalleResponse } from '../../../../shared/models/producto.detalle.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  // Obtener la lista de productos desde la API
  getProductos(): Observable<ProductoResponse[]> {
    return this.http.get<ProductoResponse[]>(`${environment.API_URL}/producto`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // Obtener la lista de categorías desde la API
  getCategorias() {
    return this.http.get<any>(`${environment.API_URL}/general/categorias`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // Obtener la lista de detalles de productos desde la API
  getDetalleProductos() {
    return this.http.get<any>(`${environment.API_URL}/producto/detalle`, { headers: { "requireToken": "true" } })
      .pipe(tap(response => console.log("Detalles de producto recibidos:", response)), catchError((error) => this.handlerError(error)));
  }

  // Crear un nuevo producto en la API
  new(producto: ProductoResponse): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/producto`, producto, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // Crear un nuevo detalle de producto en la API
  newDetalle(productoDetalle: ProductoDetalleResponse): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/producto/detalle`, productoDetalle, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // Actualizar un producto en la API
  update(producto: ProductoResponse): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/producto`, producto, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // Eliminar un producto por su ID en la API
  delete(idProducto: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/producto/${idProducto}`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
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