import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from '../../../shared/utils/base-form';
import { ProductoService } from '../artiregister/services/producto.service';
import { Categoria } from '../../../shared/models/categoria.interface';
import { Subject, takeUntil } from 'rxjs';
import { ProductoResponse } from '../../../shared/models/producto.interface';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-artiregister',
  templateUrl: './artiregister.component.html',
  styleUrls: ['./artiregister.component.scss']
})
export class ArtiregisterComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  categorias: Categoria[] = [];
  actionTODO = Action.NEW;
  titleButton = "Guardar";

  productoForm = this.fb.group({
    idProducto: [''],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    idCategoria: ['', [Validators.required]],
    idRegistro: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public baseForm: BaseForm, private router: Router,
    private productoSvc: ProductoService) { }

  ngOnInit(): void {
    this.productoSvc.getCategorias().pipe(takeUntil(this.destroy$)).subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
    this.pathData();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave() {
    if (this.productoForm.invalid) return;

    const formValues = this.productoForm.getRawValue();

    var newProducto: ProductoResponse = {
      idProducto: 0,
      nombre: formValues.nombre ? formValues.nombre : '',
      descripcion: formValues.descripcion ? formValues.descripcion : '',
      idCategoria: formValues.idCategoria ? parseInt(formValues.idCategoria) : 0,
    }

    this.productoSvc.new(newProducto).pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.router.navigate(['articulos/general']);
      }
    });

  }

  onClear() {
    this.productoForm.reset();
  }

  pathData() {
    if (this.data.producto.idProducto) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Editar";
      this.productoForm.patchValue({
        idProducto: this.data.producto?.idProducto,
        nombre: this.data.producto?.nombre,
        descripcion: this.data.producto?.descripcion,
        idCategoria: this.data.producto?.idCategoria
      });
      this.productoForm.updateValueAndValidity();
    }
  }

}
