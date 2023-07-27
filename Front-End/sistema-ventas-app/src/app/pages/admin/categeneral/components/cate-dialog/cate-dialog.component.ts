import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriasService } from '../../../services/categorias.service';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';

enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-cate-dialog',
  templateUrl: './cate-dialog.component.html',
  styleUrls: ['./cate-dialog.component.scss']
})
export class CateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true;

  cateForm: FormGroup;

  isEdit = false;
  index: number =0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, categoria: any },
    public dialogRef: MatDialogRef<CateDialogComponent>,
    private formBuilder: FormBuilder,
    public baseForm: BaseForm,
    private categoriasService: CategoriasService
  ) {
    this.cateForm = this.formBuilder.group({
      idCategoria: [null],
      nombre: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      ]],
      fecha_Registro: [null],
    });
  }

  onClear() {
    this.cateForm.reset();
  }

  ngOnInit() {
    if (this.data.categoria.idCategoria) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Editar";
      this.isEdit = true;
      this.index = this.data.categoria.idCategoria;
      this.cateForm.patchValue(this.data.categoria);
      this.cateForm.updateValueAndValidity();
    }
  }

  onSave() {
    if (this.cateForm.valid) {
      const nuevaCategoria = {
        idCategoria: this.isEdit ? this.index : null,
        nombre: this.cateForm.get('nombre')?.value,
        descripcion: this.cateForm.get('descripcion')?.value,
        fecha_Registro: new Date()
      };

      if (this.actionTODO === Action.NEW) {
        this.categoriasService.agregarCategoria(nuevaCategoria).subscribe(
          (response: any) => {
            console.log('Categoría registrada correctamente:', response.mensaje);
            this.dialogRef.close({ mensaje: response.mensaje });
          },
          (error) => {
            console.error('Error al registrar la categoría:', error);
          }
        );
      } else if (this.actionTODO === Action.EDIT) {
        this.categoriasService.actualizarCategoria(this.index, nuevaCategoria).subscribe(
          (response: any) => {
            console.log('Categoría editada correctamente:', response.mensaje);
            this.dialogRef.close({ mensaje: response.mensaje });
          },
          (error) => {
            console.error('Error al editar la categoría:', error);
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
