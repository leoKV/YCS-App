import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionGuard  {
  constructor(private authSvc: AuthService, private router: Router){}
  canActivate():Observable<boolean>{
    return this.authSvc.token$.pipe(
      take(1),
      map(token=> {
        if(token) return true;

        this.router.navigate(["home"]);
        return false;
      })
    )
  }  
}
