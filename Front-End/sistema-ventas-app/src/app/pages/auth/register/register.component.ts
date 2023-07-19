import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../../auth/services/register.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from '../../../shared/utils/base-form';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true;

  clientForm = this.fb.group({
    idUsuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    apellidoPaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    apellidoMaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
    Validators.pattern(/^[0-9]{10}$/)]],
    contrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
    confirmContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  }, { validator: this.checkMatchingContrasenia("contrasenia", "confirmContrasenia") });

  constructor(private fb: FormBuilder, public baseForm: BaseForm,
    private clientSvc: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave() {
    if (this.clientForm.invalid) return;

    var data = this.clientForm.value;
    const { confirmContrasenia, idUsuario, ...client } = data;

    this.clientSvc.newClient(client).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result) {
        this.router.navigate(['login']);
        this.openSnackBar('Usuario registrado exitosamente');
      } else {
        this.openSnackBar('Ocurrió un error al registrar el usuario');
      }
    });
  }

  private openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000, // Duración del mensaje en milisegundos
      verticalPosition: 'top', // Posición del mensaje en la pantalla (arriba)
      panelClass: 'my-snackbar' // Clase CSS personalizada para ocultar el botón de acción
    };

    this.snackBar.open(message, undefined, config);
  }

  onClear() {
    this.clientForm.reset();
  }

  private checkMatchingContrasenia(contraseniaKey: string, contraseniaConfirmKey: string) {
    return (group: FormGroup) => {
      let contraseniaInput = group.controls[contraseniaKey];
      let contraseniaConfirmInput = group.controls[contraseniaConfirmKey];

      if (contraseniaInput.value != contraseniaConfirmInput.value) {
        return contraseniaConfirmInput.setErrors({ notEquivalentContrasenias: true });
      } else {
        return contraseniaConfirmInput.setErrors(null);
      }
    }
  }
}

