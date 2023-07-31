// Importar módulos y dependencias necesarias
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoDetalleResponse } from '../../../../../shared/models/producto.detalle.interface';
import { ProductoDetalleService } from '../../../artidetails/services/producto-detalle.service';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Enumeración para determinar la acción a realizar (Nuevo o Editar)
enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-product-detalle-dialog',
  templateUrl: './product-detalle-dialog.component.html',
  styleUrls: ['./product-detalle-dialog.component.scss']
})
export class ProductDetalleDialogComponent implements OnInit, OnDestroy {
  // Variables y configuraciones iniciales
  private destroy$ = new Subject();
  actionTODO = Action.NEW;
  titleButton = "Guardar";

  // Definición del formulario utilizando FormBuilder
  productoDetalleForm = this.fb.group({
    idDetalleProducto: [''],
    talla: ['', [Validators.required]],
    color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(9)]],
    precioUnitario: ['', [Validators.required, this.precioMayorACeroValidator]],
    stock: ['', [Validators.required, this.stockMayorACeroValidator]],
    idProducto: [''],
  });

  constructor(
    // Inyección de dependencias
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductDetalleDialogComponent>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private productoDetalleSvc: ProductoDetalleService,
    private productoSvc: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Obtener el idProducto del objeto data (si existe)
    const idProducto = this.data?.idProducto || null;

    // Asignar el idProducto al formulario
    this.productoDetalleForm.patchValue({
      idProducto: idProducto
    });

    // Obtener el detalle del producto desde data (si existe)
    const detalle = this.data?.productoDetalle || null;

    // Actualizar el formulario si se está editando un detalle existente
    if (detalle) {
      this.actionTODO = Action.EDIT;
      this.titleButton = 'Editar';

      this.productoDetalleForm.patchValue({
        idDetalleProducto: detalle.idDetalleProducto !== null ? detalle.idDetalleProducto : 0,
        talla: detalle.talla || '',
        color: detalle.color || '',
        precioUnitario: detalle.precioUnitario !== null ? detalle.precioUnitario : 0,
        stock: detalle.stock !== null ? detalle.stock : 0,
        idProducto: detalle.idProducto !== null ? detalle.idProducto : 0,
      });
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse de observables para evitar memory leaks
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Función que se ejecuta al hacer clic en el botón "Guardar"
  onSave() {
    // Verificar si el formulario es inválido (si no cumple las validaciones)
    if (this.productoDetalleForm.invalid) {
      // Mostrar mensajes de Snackbar para cada validación no cumplida

      // Validar si el campo 'talla' es requerido
      if (this.productoDetalleForm.get('talla')?.hasError('required')) {
        this.showSnackbarMessage('La Talla es requerida');
      }

      // Validar si el campo 'color' es requerido
      if (this.productoDetalleForm.get('color')?.hasError('required')) {
        this.showSnackbarMessage('El Color es requerido');
      }

      // Validar si el campo 'color' tiene una longitud mínima
      if (this.productoDetalleForm.get('color')?.hasError('minlength')) {
        this.showSnackbarMessage('El Color debe tener al menos 3 caracteres');
      }

      // Validar si el campo 'color' tiene una longitud máxima
      if (this.productoDetalleForm.get('color')?.hasError('maxlength')) {
        this.showSnackbarMessage('El Color debe tener máximo 9 caracteres');
      }

      // Validar si el campo 'precioUnitario' es requerido
      if (this.productoDetalleForm.get('precioUnitario')?.hasError('required')) {
        this.showSnackbarMessage('El Precio Unitario es requerido');
      }

      // Validar si el campo 'precioUnitario' tiene un valor menor o igual a cero (precio negativo)
      if (this.productoDetalleForm.get('precioUnitario')?.hasError('precioMenorACero')) {
        this.showSnackbarMessage('El Precio Unitario debe ser mayor a cero');
      }

      // Validar si el campo 'stock' es requerido
      if (this.productoDetalleForm.get('stock')?.hasError('required')) {
        this.showSnackbarMessage('El Stock es requerido');
      }

      // Validar si el campo 'stock' tiene un valor menor o igual a cero (stock negativo)
      if (this.productoDetalleForm.get('stock')?.hasError('stockMenorACero')) {
        this.showSnackbarMessage('El Stock debe ser mayor a cero');
      }

      // Salir de la función si el formulario es inválido
      return;
    }

    // Si el formulario es válido, obtener los valores del formulario
    const formValues = this.productoDetalleForm.getRawValue();

    // Verificar si la acción a realizar es un nuevo detalle (Action.NEW)
    if (this.actionTODO == Action.NEW) {
      // Crear un nuevo objeto 'ProductoDetalleResponse' con los datos del formulario
      var newProducto: ProductoDetalleResponse = {
        idDetalleProducto: formValues.idDetalleProducto ? parseInt(formValues.idDetalleProducto) : null,
        talla: formValues.talla ? formValues.talla : null,
        color: formValues.color ? formValues.color : null,
        precioUnitario: formValues.precioUnitario ? parseInt(formValues.precioUnitario) : null,
        stock: formValues.stock ? parseInt(formValues.stock) : null,
        idProducto: formValues.idProducto ? parseInt(formValues.idProducto) : null,
      }

      // Llamar al servicio 'productoSvc.newDetalle()' para guardar el nuevo detalle en la API
      this.productoSvc.newDetalle(newProducto).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          // Cerrar el diálogo modal y retornar el resultado (resultado de la operación de guardar)
          this.dialogRef.close(result);
        }
      });

    } else if (this.actionTODO == Action.EDIT) {
      // Si la acción es editar (Action.EDIT), se debe actualizar un detalle existente

      // Crear un objeto 'ProductoDetalleResponse' con los datos del formulario actualizados
      const updatedDetalle: ProductoDetalleResponse = {
        idDetalleProducto: formValues.idDetalleProducto ? parseInt(formValues.idDetalleProducto) : null,
        talla: formValues.talla ? formValues.talla : null,
        color: formValues.color ? formValues.color : null,
        precioUnitario: formValues.precioUnitario ? parseInt(formValues.precioUnitario) : null,
        stock: formValues.stock ? parseInt(formValues.stock) : null,
        idProducto: formValues.idProducto ? parseInt(formValues.idProducto) : null,
      };

      // Llamar al servicio 'productoDetalleSvc.updateDetalle()' para actualizar el detalle en la API
      this.productoDetalleSvc.updateDetalle(updatedDetalle)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if (result) {
            // Cerrar el diálogo modal y retornar el resultado (resultado de la operación de actualización)
            this.dialogRef.close(result);
          }
        });
    }
  }

  onClear() {
    this.productoDetalleForm.reset();
  }

  showSnackbarMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración en milisegundos para mostrar el snackbar
      verticalPosition: 'top', // Posición vertical del snackbar
      horizontalPosition: 'center' // Posición horizontal del snackbar
    });
  }

  precioMayorACeroValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const precio = Number(control.value);
    if (isNaN(precio) || precio <= 0) {
      return { 'precioMenorACero': true };
    }
    return null;
  }

  stockMayorACeroValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const stock = Number(control.value);
    if (isNaN(stock) || stock <= 0) {
      return { 'stockMenorACero': true };
    }
    return null;
  }
}