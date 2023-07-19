import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteResponse } from '../../../shared/models/cliente.interface';
import { environment } from '@env/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient) { }

  newClient(client: ClienteResponse): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/cliente`, client, { headers: { "requireToken": "true" } })
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
