import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isLogged = false;
  @Output() togglesidenav = new EventEmitter<void>();
  data: any={};
  constructor(private authSvc:AuthService){}

  ngOnInit():void{ 
    
    this.authSvc.isLogged$.subscribe((result)=>{
      this.isLogged = result;
    });

    this.authSvc.tokenData$.subscribe((data:any)=>{
      this.data= data;
    });
  }

  onLogout(){ 
    this.authSvc.logout();
    this.data= null;
  }

  onToggleSidenav():void{
    this.togglesidenav.emit();
  }

}
