import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, take, takeUntil } from 'rxjs';
import { group } from '@angular/animations';
import { Rol } from '../../../../../shared/models/rol.interface';

enum Action{
  NEW ='new',
  EDIT ='edit'
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit,OnDestroy {

  private destroy$ = new Subject();
  roles: Rol[] =[];
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true;

  userForm = this.fb.group({
    idUsuario: [''],
    nombre:['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    apellidoPaterno:['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    apellidoMaterno:['',[Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    email:['',[Validators.required, Validators.email]],
    telefono:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    roles:['',[Validators.required]],
    contrasenia:['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
    confirmContrasenia:['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]]
  },{validator:this.checkMatchingContrasenia("contrasenia","confirmContrasenia")});
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
              public dialogRef:MatDialogRef<UserDialogComponent>,
              private fb:FormBuilder, public baseForm:BaseForm,
              private userSvc:UsuarioService)
  {
    
  }
  ngOnInit(): void {
    this.userSvc.getRoles().pipe(takeUntil(this.destroy$)).subscribe((roles)=>{
      this.roles = roles;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave(){
    if(this.userForm.invalid) return;

    var data = this.userForm.value;
    const {confirmContrasenia,idUsuario,...user} = data;

    this.userSvc.new(user).pipe(takeUntil(this.destroy$)).subscribe(result=>{
      if(result){
        this.dialogRef.close(result);
      }
    });

  }

  onClear(){
    this.userForm.reset();
  }

  private checkMatchingContrasenia(contraseniaKey: string, contraseniaConfirmKey:string){
    return (group:FormGroup)=>{
      let contraseniaInput = group.controls[contraseniaKey];
      let contraseniaConfirmInput = group.controls[contraseniaConfirmKey];

      if(contraseniaInput.value != contraseniaConfirmInput.value){
        return contraseniaConfirmInput.setErrors({notEquivalentContrasenias:true});
      }else{
        return contraseniaConfirmInput.setErrors(null);
      }
    }
  }
}
