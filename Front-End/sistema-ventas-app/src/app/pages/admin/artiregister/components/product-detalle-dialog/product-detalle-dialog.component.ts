import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoDetalleResponse } from '../../../../../shared/models/producto.detalle.interface';
import { ProductoService } from '../../services/producto.service';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';

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
  private destroy$ = new Subject();
  actionTODO = Action.NEW;
  titleButton = "Guardar";

  productoDetalleForm = this.fb.group({
    idDetalleroducto: [''],
    talla: [''],
    color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    precioUnitario: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    idProducto: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductDetalleDialogComponent>, private fb: FormBuilder, public baseForm: BaseForm,
    private productoSvc: ProductoService) { }

  ngOnInit(): void {
    // Obtener el idProducto del objeto data
    const idProducto = this.data?.idProducto || null;

    // Asignar el idProducto al formulario
    this.productoDetalleForm.patchValue({
      idProducto: idProducto
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  onSave() {
    if (this.productoDetalleForm.invalid) return;

    const formValues = this.productoDetalleForm.getRawValue();

    if (this.actionTODO == Action.NEW) {
      var newProducto: ProductoDetalleResponse = {
        idDetalleProducto: 0,
        talla: formValues.talla ? formValues.talla : '',
        color: formValues.color ? formValues.color : '',
        precioUnitario: formValues.precioUnitario ? parseInt(formValues.precioUnitario) : 0,
        stock: formValues.stock ? parseInt(formValues.stock) : 0,
        idProducto: formValues.idProducto ? parseInt(formValues.idProducto) : 0,
      }

      this.productoSvc.newDetalle(newProducto).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    }
  }


  onClear() {
    this.productoDetalleForm.reset();
  }
}