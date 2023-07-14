import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsersModule { }
