import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CateregisterRoutingModule } from './cateregister-routing.module';
import { CateregisterComponent } from './cateregister.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CateregisterComponent,
    
  ],
  imports: [
    CommonModule,
    CateregisterRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CateregisterModule { }