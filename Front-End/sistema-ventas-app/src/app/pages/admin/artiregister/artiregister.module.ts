import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtiregisterRoutingModule } from './artiregister-routing.module';
import { ArtiregisterComponent } from './artiregister.component';


@NgModule({
  declarations: [
    ArtiregisterComponent
  ],
  imports: [
    CommonModule,
    ArtiregisterRoutingModule
  ]
})
export class ArtiregisterModule { }
