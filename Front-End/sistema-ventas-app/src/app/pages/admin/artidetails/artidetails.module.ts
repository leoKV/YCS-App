import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtidetailsRoutingModule } from './artidetails-routing.module';
import { ArtidetailsComponent } from './artidetails.component';


@NgModule({
  declarations: [
    ArtidetailsComponent
  ],
  imports: [
    CommonModule,
    ArtidetailsRoutingModule
  ]
})
export class ArtidetailsModule { }
