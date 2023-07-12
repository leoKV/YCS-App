import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CateregisterRoutingModule } from './cateregister-routing.module';
import { CateregisterComponent } from './cateregister.component';


@NgModule({
  declarations: [
    CateregisterComponent
  ],
  imports: [
    CommonModule,
    CateregisterRoutingModule
  ]
})
export class CateregisterModule { }
