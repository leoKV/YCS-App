import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from '../../../shared/utils/base-form';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RegisterService } from '../services/register.service';

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
  // Un Subject que se utiliza para manejar la finalización de observables
  private destroy$ = new Subject();

  // Enumeración que define posibles acciones
  actionTODO = Action.NEW;

  // Título del botón de guardar
  titleButton = "Guardar";

  // Variables para ocultar contraseñas
  hidePwd = true;
  hideConfirmPwd = true;

  // ViewChilds para acceder a los elementos del DOM
  @ViewChild('nombreField') nombreField: any;
  @ViewChild('apellidoPaternoField') apellidoPaternoField: any;
  @ViewChild('apellidoMaternoField') apellidoMaternoField: any;
  @ViewChild('emailField') emailField: any;
  @ViewChild('telefonoField') telefonoField: any;
  @ViewChild('contraseniaField') contraseniaField: any;
  @ViewChild('confirmContraseniaField') confirmContraseniaField: any;

  // FormGroup para el formulario de registro con validaciones y validador personalizado
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

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // Notifica a los observables que deben finalizar
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave() {
    // Verifica si el formulario es inválido
    if (this.clientForm.invalid) {
      // Comprobación y mensajes de alerta para los campos inválidos
      if (this.clientForm.get('nombre')?.invalid) {
        this.openSnackBar('El campo Nombre es requerido.');
      }

      if (this.clientForm.get('apellidoPaterno')?.invalid) {
        this.openSnackBar('El campo Apellido Paterno es requerido.');
      }

      if (this.clientForm.get('apellidoMaterno')?.invalid) {
        this.openSnackBar('El campo Apellido Materno es requerido.');
      }

      if (this.clientForm.get('email')?.invalid) {
        if (this.clientForm.get('email')?.hasError('required')) {
          this.openSnackBar('El campo Correo es requerido.');
        } else if (this.clientForm.get('email')?.hasError('email')) {
          this.openSnackBar('El campo Correo debe ser una dirección de correo válida.');
        }
      }

      if (this.clientForm.get('telefono')?.invalid) {
        if (this.clientForm.get('telefono')?.hasError('required')) {
          this.openSnackBar('El campo Numero de Telefono es requerido.');
        } else if (this.clientForm.get('telefono')?.hasError('minlength') || this.clientForm.get('telefono')?.hasError('maxlength')) {
          this.openSnackBar('El campo Numero de Telefono debe contener exactamente 10 dígitos numéricos.');
        } else if (this.clientForm.get('telefono')?.hasError('pattern')) {
          this.openSnackBar('El campo Numero de Telefono debe contener solo dígitos numéricos.');
        }
      }

      if (this.clientForm.get('contrasenia')?.invalid) {
        if (this.clientForm.get('contrasenia')?.hasError('required')) {
          this.openSnackBar('El campo Contraseña es requerido.');
        } else if (this.clientForm.get('contrasenia')?.hasError('minlength')) {
          this.openSnackBar('La Contraseña debe tener al menos 8 caracteres.');
        } else if (this.clientForm.get('contrasenia')?.hasError('maxlength')) {
          this.openSnackBar('La Contraseña no debe exceder los 16 caracteres.');
        } else if (this.clientForm.get('contrasenia')?.hasError('pattern')) {
          this.openSnackBar('La Contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        }
      }

      if (this.clientForm.get('confirmContrasenia')?.invalid) {
        if (this.clientForm.get('confirmContrasenia')?.hasError('required')) {
          this.openSnackBar('El campo Confirmar Contraseña es requerido.');
        } else if (this.clientForm.get('confirmContrasenia')?.hasError('minlength') || this.clientForm.get('confirmContrasenia')?.hasError('maxlength')) {
          this.openSnackBar('El campo Confirmar Contraseña debe contener entre 8 y 16 caracteres.');
        }
      }

      // Verifica si las contraseñas coinciden
      if (this.clientForm.get('contrasenia')?.value !== this.clientForm.get('confirmContrasenia')?.value) {
        this.openSnackBar('La Contraseña y Confirmar Contraseña deben ser iguales.');
        return;
      }

      return; // Finaliza si el formulario es inválido
    }

    // Preparación de datos para el registro
    var data = this.clientForm.value;
    const { confirmContrasenia, idUsuario, ...client } = data;

    // Llamada al servicio para registrar al cliente
    this.clientSvc.newClient(client).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result) {
        this.router.navigate(['login']);
        this.openSnackBar('Usuario registrado exitosamente');
      } else {
        this.openSnackBar('Ocurrió un error al registrar el usuario');
      }
    });
  }

  // Función para mostrar una alerta Snackbar con un mensaje dado
  private openSnackBar(message: string) {
    // Configuración de la alerta Snackbar
    const config: MatSnackBarConfig = {
      duration: 3000,            // Duración en milisegundos que se mostrará la alerta
      verticalPosition: 'top',   // Posición vertical de la alerta en la pantalla (arriba)
      panelClass: 'my-snackbar'  // Clase CSS personalizada para estilizar la alerta
    };

    // Abre la alerta Snackbar con el mensaje y la configuración
    this.snackBar.open(message, undefined, config);
  }

  // Función para limpiar y resetear el formulario
  onClear() {
    this.clientForm.reset();
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  private checkMatchingContrasenia(contraseniaKey: string, contraseniaConfirmKey: string) {
    return (group: FormGroup) => {
      // Obtiene los controles de las contraseñas y confirmar contraseñas
      let contraseniaInput = group.controls[contraseniaKey];
      let contraseniaConfirmInput = group.controls[contraseniaConfirmKey];

      // Comprueba si las contraseñas son diferentes
      if (contraseniaInput.value !== contraseniaConfirmInput.value) {
        // Establece un error en el control de confirmar contraseñas
        return contraseniaConfirmInput.setErrors({ notEquivalentContrasenias: true });
      } else {
        // Si coinciden, elimina cualquier error en el control de confirmar contraseñas
        return contraseniaConfirmInput.setErrors(null);
      }
    };
  }
}