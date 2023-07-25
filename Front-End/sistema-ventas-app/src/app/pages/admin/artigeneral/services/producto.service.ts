import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductoResponse } from '../../../../shared/models/producto.interface';
import { ProductoDetalleResponse } from '../../../../shared/models/producto.detalle.interface';
import { environment } from '@env/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient) { }

  getProductos(): Observable<ProductoResponse[]> {
    return this.http.get<ProductoResponse[]>(`${environment.API_URL}/producto`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  getProducto(): Observable<ProductoResponse[]> {
    return this.http.get<ProductoResponse[]>(`${environment.API_URL}/producto/detalle/id`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  getCategorias() {
    return this.http.get<any>(`${environment.API_URL}/general/categorias`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  new(producto: ProductoResponse): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/producto`, producto, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  newDetalle(productoDetalle: ProductoDetalleResponse): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/producto/detalle`, productoDetalle, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  update(producto: ProductoResponse): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/producto`, producto, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  delete(idProducto: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/producto/${idProducto}`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  handlerError(error: any): Observable<never> {
    console.log("Error")
    let errorMessage = "Ocurrió un error";
    if (error.error) {
      errorMessage = `Error: ${error.error.mensaje}`;
    }
    this.snackBar.open(errorMessage, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
    return throwError(() => new Error(errorMessage));
  }
}
