import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategeneralComponent } from './categeneral.component';

const routes: Routes = [{ path: '', component: CategeneralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategeneralRoutingModule { }
