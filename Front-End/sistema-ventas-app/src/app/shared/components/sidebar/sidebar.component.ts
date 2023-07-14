import { Component, OnDestroy, OnInit } from '@angular/core';
import { Perfil } from '../../models/perfil.interface';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy{
  private destroy$ = new Subject();
  menus: any[] =[];
  data: Perfil | undefined;
  constructor(private authSvc: AuthService){}
  ngOnInit():void{
    this.authSvc.tokenData$.pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.data = data;
      this.generateMenu();
    })
    
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete();
  }

  private generateMenu(){
    this.menus =[];
    var roles = this.data?.roles;
    if(roles){
      for(let rol of roles){
        if(rol.clave == 'admin'){
          this.menus.push(...[
            {icon: 'manage_accounts',name:'Usuarios',route:'admin/users'},
            {icon: 'category',name:'Categorías',route:'admin/categorias'},
            {icon: 'inventory_2',name:'Productos',route:'admin/productos'}
          ]);
        }
        if(rol.clave == 'supervisor'){
          this.menus.push(...[
            {icon: 'category',name:'Categorías',route:'admin/categorias'},
            {icon: 'inventory_2',name:'Productos',route:'admin/productos'}
          ]);
        }
        if(rol.clave == 'cliente'){
          
        }
      }
    }
  }

}
