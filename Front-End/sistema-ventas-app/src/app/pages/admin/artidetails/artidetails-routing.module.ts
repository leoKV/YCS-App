import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtidetailsComponent } from './artidetails.component';

const routes: Routes = [{ path: '', component: ArtidetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtidetailsRoutingModule { }