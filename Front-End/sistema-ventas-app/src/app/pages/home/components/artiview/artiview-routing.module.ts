import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtiviewComponent } from './artiview.component';

const routes: Routes = [{ path: '', component: ArtiviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtiviewRoutingModule { }