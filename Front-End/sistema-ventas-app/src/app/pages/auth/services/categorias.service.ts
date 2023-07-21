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
  private apiUrl = 'http://localhost:3000/api'; //  URL de back-end

  constructor(private http: HttpClient) { }

  getIdRegisterFromSession(): number {
    // obtener el idRegister de la sesión.
    const idRegister = sessionStorage.getItem('idRegister');
    console.log('idRegister:', idRegister);
    return idRegister ? +idRegister : 0; // Convierte a número o devuelve 0 si no se encuentra el idRegister en la sesión.
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
    return this.http.post<any>(url, categoria, this.httpOptions).pipe( // Usar httpOptions en lugar de getHeaders()
      catchError(this.handleError)
    );
  }
  // Método para actualizar una categoría existente
  actualizarCategoria(idCategoria: number, categoria: any): Observable<any> {
    const url = `${this.apiUrl}/categorias/${idCategoria}`;
    return this.http.put<any>(url, categoria, this.httpOptions).pipe( // Usar httpOptions en lugar de getHeaders()
      catchError(this.handleError)
    );
  }
  // Método para eliminar una categoría
  eliminarCategoria(idCategoria: number): Observable<any> {
    const url = `${this.apiUrl}/categorias/${idCategoria}`;
    return this.http.delete<any>(url, this.httpOptions).pipe( // Usar httpOptions en lugar de getHeaders()
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