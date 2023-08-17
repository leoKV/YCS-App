import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategeneralRoutingModule } from './categeneral-routing.module';
import { CategeneralComponent } from './categeneral.component';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';
import { CateDialogComponent } from '../../admin/categeneral/components/cate-dialog/cate-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CategeneralComponent,
    CateDialogComponent

  ],
  imports: [
    CommonModule,
    CategeneralRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CategeneralModule { }
