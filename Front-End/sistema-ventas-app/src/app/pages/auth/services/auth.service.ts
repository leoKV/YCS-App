import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import { environment } from '@env/environment.development';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = new BehaviorSubject<string>("");
  private tokenData = new BehaviorSubject<any>({});
  private isLogged = new BehaviorSubject<boolean>(false);

  constructor(private snackBar:MatSnackBar,
              private router:Router,
              private http:HttpClient) {
                this.checkToken();
              }

  get token$():Observable<string>{
    return this.token.asObservable();
  }

  get tokenValue(){
    return this.token.value;
  }
            
  get tokenData$():Observable<any>{
    return this.tokenData.asObservable();
  }

  get isLogged$():Observable<boolean>{
    return this.isLogged.asObservable();
  }

  saveLocalStorage(token: string){
    localStorage.setItem("token",token);
  }

  logout() {
    localStorage.removeItem("token");
    this.token.next("");
    this.tokenData.next(null);
    this.isLogged.next(false);
    this.router.navigate(['/']);
  }

  checkToken(){
    const token = localStorage.getItem("token");
    if(token){
      const isExpired = helper.isTokenExpired(token);
      if(isExpired){
        this.logout();
      }else{
        this.token.next(token);
        //Renovar los datos del perfil
        const{ iat, exp, ...data } = helper.decodeToken(token);
        this.tokenData.next(data);
        this.isLogged.next(true);
      }
    }else{
      this.logout();
    }
  }

  login(loginData:any):Observable<AuthResponse | void>{
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth`,loginData)
      .pipe(map((data:AuthResponse)=>{
        if(data.token){
          this.saveLocalStorage(data.token);
          console.log('Token JWT almacenado en localStorage:', data.token); // Agregar esta línea
          // this.token.next(data.token);
          // this.isLogged.next(true);
          this.router.navigate(['/home']);

          this.checkToken();
        }
        return data;
       
      }),
      catchError((error)=>this.handlerError(error)));
      
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
