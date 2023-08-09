import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategeneralRoutingModule } from './categeneral-routing.module';
import { CategeneralComponent } from './categeneral.component';


@NgModule({
  declarations: [
    CategeneralComponent
  ],
  imports: [
    CommonModule,
    CategeneralRoutingModule
  ]
})
export class CategeneralModule { }
