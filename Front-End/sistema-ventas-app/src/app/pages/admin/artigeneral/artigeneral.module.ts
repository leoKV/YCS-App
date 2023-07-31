import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtigeneralRoutingModule } from './artigeneral-routing.module';
import { ArtigeneralComponent } from './artigeneral.component';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArtigeneralComponent,
  ],
  imports: [
    CommonModule,
    ArtigeneralRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ArtigeneralModule { }