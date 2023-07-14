import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard {
  constructor(private authSvc:AuthService, private router: Router){}
  canActivate(): Observable<boolean>{
    return this.authSvc.token$.pipe(
      take(1),
      map(token=>{
        if(!token) return true;

        this.router.navigate(["home"]);
        return false;
      })
    )
  }
  
}
