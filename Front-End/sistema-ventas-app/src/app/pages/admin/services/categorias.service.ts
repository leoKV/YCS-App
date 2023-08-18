import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  // Propiedad para indicar que se necesita el token de autorización
  private httpOptions = { headers: new HttpHeaders({ 'requireToken': 'true' }) };
  private apiUrl = 'http://146.190.112.187:3000/api'; 

  constructor(private http: HttpClient) { }

  // Método para obtener el token desde el sessionStorage
  getTokenFromSession(): string | null {
    // Obtener el token JWT de la sesión
    const token = localStorage.getItem('token'); 
    console.log('Token JWT:', token);
    return token;
  }
  // Método para obtener todas las categorías
  getCategorias(): Observable<any> {
    const url = `${this.apiUrl}/categorias`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }
  // Método para agregar una nueva categoría
  agregarCategoria(categoria: any): Observable<any> {
    const url = `${this.apiUrl}/categorias`;
    return this.http.post<any>(url, categoria, this.httpOptions).pipe( 
      catchError(this.handleError)
    );
  }
  actualizarCategoria(idCategoria: number, categoria: any): Observable<any> {
    const url = `${this.apiUrl}/categorias/${idCategoria}`;
    const token = this.getTokenFromSession(); // Obtener el token
    const httpOptions = {
      headers: new HttpHeaders({
        'auth': `Bearer ${token}` 
      })
    };
    return this.http.put<any>(url, categoria, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  eliminarCategoria(idCategoria: number): Observable<any> {
    const url = `${this.apiUrl}/categorias/${idCategoria}`;
    const token = this.getTokenFromSession(); // Obtener el token
    const httpOptions = {
      headers: new HttpHeaders({
        'auth': `Bearer ${token}` 
      })
    };
    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // Función para manejar errores en las peticiones HTTP
  private handleError(error: any) {
    let errorMessage = 'Ocurrió un error en la solicitud.';
    if (error.error && error.error.mensaje) {
      errorMessage = `Error: ${error.error.mensaje}`;
    }
    console.error(error);
    return throwError(errorMessage);
  }
}
