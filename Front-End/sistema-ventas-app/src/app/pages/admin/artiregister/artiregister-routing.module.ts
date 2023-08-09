import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtiregisterComponent } from './artiregister.component';

const routes: Routes = [{ path: '', component: ArtiregisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtiregisterRoutingModule { }