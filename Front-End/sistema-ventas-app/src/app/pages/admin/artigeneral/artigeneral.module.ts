import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtigeneralRoutingModule } from './artigeneral-routing.module';
import { ArtigeneralComponent } from './artigeneral.component';


@NgModule({
  declarations: [
    ArtigeneralComponent
  ],
  imports: [
    CommonModule,
    ArtigeneralRoutingModule
  ]
})
export class ArtigeneralModule { }
