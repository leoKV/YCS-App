import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { CheckSessionGuard } from './shared/guards/check-session.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home', pathMatch:'full'
  },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'notFound',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { 
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), 
    canActivate:[CheckSessionGuard] 
  }, 
  { 
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate:[CheckLoginGuard]
  }, 
  { 
    path: 'register', 
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule),
    canActivate:[CheckLoginGuard]
  },
  { path: 'categorias/register', loadChildren: () => import('./pages/admin/cateregister/cateregister.module').then(m => m.CateregisterModule) },
  { path: 'categorias/general', loadChildren: () => import('./pages/admin/categeneral/categeneral.module').then(m => m.CategeneralModule) },
  { path: 'articulos/register', loadChildren: () => import('./pages/admin/artiregister/artiregister.module').then(m => m.ArtiregisterModule) },
  { path: 'articulos/detail', loadChildren: () => import('./pages/admin/artidetails/artidetails.module').then(m => m.ArtidetailsModule) },
  { path: 'articulos/general', loadChildren: () => import('./pages/admin/artigeneral/artigeneral.module').then(m => m.ArtigeneralModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }