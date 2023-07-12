import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtigeneralComponent } from './artigeneral.component';

const routes: Routes = [{ path: '', component: ArtigeneralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtigeneralRoutingModule { }
