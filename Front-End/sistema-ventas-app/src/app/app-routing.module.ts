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
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
  { path: 'payment/envio', loadChildren: () => import('./pages/payment/envio/envio.module').then(m => m.EnvioModule) },
  { path: 'payment/pay', loadChildren: () => import('./pages/payment/pay/pay.module').then(m => m.PayModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
