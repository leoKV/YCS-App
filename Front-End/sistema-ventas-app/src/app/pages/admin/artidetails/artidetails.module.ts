import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtidetailsRoutingModule } from './artidetails-routing.module';
import { ArtidetailsComponent } from './artidetails.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // Agrega esta importación
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    ArtidetailsComponent,
    ImageUploadComponent,
  ],
  imports: [
    CommonModule,
    ArtidetailsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ArtidetailsModule { }