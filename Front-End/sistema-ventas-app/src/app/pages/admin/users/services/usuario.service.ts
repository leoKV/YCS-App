import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioResponse } from '../../../../shared/models/usuario.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private snackBar: MatSnackBar, 
              private router:Router, 
              private http:HttpClient) { }
              
  getUsuarios():Observable<UsuarioResponse[]>{
    return this.http.get<UsuarioResponse[]>(`${environment.API_URL}/usuario`,{headers:{"requireToken":"true"}})
    .pipe(catchError((error)=>this.handlerError(error)));
  }
  
  getRoles(){
    return this.http.get<any>(`${environment.API_URL}/general/roles`,{headers:{"requireToken":"true"}})
    .pipe(catchError((error)=>this.handlerError(error)));
  }
            
  new(user:UsuarioResponse):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/usuario`,user,{headers:{"requireToken":"true"}})
    .pipe(catchError((error)=>this.handlerError(error)));
  }
            
  update(user:UsuarioResponse):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/usuario`,user,{headers:{"requireToken":"true"}})
    .pipe(catchError((error)=>this.handlerError(error)));
  }
            
  delete(idUsuario:number):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/usuario/,${idUsuario}`,{headers:{"requireToken":"true"}})
    .pipe(catchError((error)=>this.handlerError(error)));
  }

  handlerError(error:any):Observable<never>{
    console.log("Error")
    let errorMessage="Ocurrió un error";
    if(error.error){
    errorMessage= `Error: ${ error.error.mensaje }`;
  }    
  this.snackBar.open(errorMessage,'',{
  duration:5000,
  horizontalPosition:'right',
  verticalPosition:'top',
  panelClass:['error-snackbar']
  });
  return throwError(()=>new Error(errorMessage));
  }
}
