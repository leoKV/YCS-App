import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtigeneralRoutingModule } from './artigeneral-routing.module';
import { ArtigeneralComponent } from './artigeneral.component';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetalleDialogComponent } from './components/product-detalle-dialog/product-detalle-dialog.component';

@NgModule({
  declarations: [
    ArtigeneralComponent,
    ProductDetalleDialogComponent
  ],
  imports: [
    CommonModule,
    ArtigeneralRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ArtigeneralModule { }
