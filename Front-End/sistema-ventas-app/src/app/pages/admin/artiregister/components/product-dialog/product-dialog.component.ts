// Importar módulos y dependencias de Angular
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

// Importar servicios e interfaces personalizadas
import { BaseForm } from '../../../../../shared/utils/base-form';
import { ProductoService } from '../../services/producto.service';
import { CategoriaResponse } from '../../../../../shared/models/categoria.interface';
import { ProductoResponse } from '../../../../../shared/models/producto.interface';
import { SharedDataService } from '../../services/shared-data-service.service';

// Definir una enumeración para los tipos de acción
enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  // Propiedad privada para gestionar la destrucción del componente
  private destroy$ = new Subject();

  // Propiedades públicas
  categorias: CategoriaResponse[] = [];
  actionTODO = Action.NEW;
  titleButton = "Guardar";

  // Título del diálogo
  title: string = 'Registro de productos';

  // Inicializar el formulario del producto utilizando FormBuilder
  productoForm = this.fb.group({
    idProducto: [''],
    nombre: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    idCategoria: ['', [Validators.required]],
    idRegistro: [''],
  });

  // Constructor con inyección de dependencias
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private productoSvc: ProductoService,
    private sharedDataService: SharedDataService // Inyectar el servicio compartido
  ) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener las categorías del servicio usando RxJS 'takeUntil' para gestionar las suscripciones
    this.productoSvc.getCategorias().pipe(takeUntil(this.destroy$)).subscribe((categorias: CategoriaResponse[]) => {
      this.categorias = categorias;
    });

    // Rellenar los datos del formulario para editar o agregar un nuevo producto
    this.pathData();
  }

  // Método que se ejecuta al destruir el componente
  ngOnDestroy(): void {
    // Desuscribirse y completar el Subject para evitar pérdidas de memoria
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Método para guardar los datos del producto según el tipo de acción (NEW o EDIT)
  onSave() {
    if (this.productoForm.invalid) return;

    const formValues = this.productoForm.getRawValue();

    if (this.actionTODO == Action.NEW) {
      // Crear un nuevo objeto de producto para agregarlo
      var newProducto: ProductoResponse = {
        idProducto: 0,
        nombre: formValues.nombre ? formValues.nombre : '',
        descripcion: formValues.descripcion ? formValues.descripcion : '',
        idCategoria: formValues.idCategoria ? parseInt(formValues.idCategoria) : 0,
        nombreCategoria: '',
        nombreUsuario: ''
      }

      // Llamar al método del servicio para agregar el nuevo producto y cerrar el diálogo
      this.productoSvc.new(newProducto).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    } else {
      // Actualizar los datos del producto existente según los cambios realizados
      var updateProducto: ProductoResponse = {
        idProducto: formValues.idProducto ? parseInt(formValues.idProducto) : 0,
        nombre: formValues.nombre ? formValues.nombre : '',
        descripcion: formValues.descripcion ? formValues.descripcion : '',
        idCategoria: formValues.idCategoria ? parseInt(formValues.idCategoria) : 0,
        nombreCategoria: '',
        nombreUsuario: ''
      }

      // Llamar al método del servicio para actualizar el producto y cerrar el diálogo
      this.productoSvc.update(updateProducto).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    }
  }

  // Método para limpiar los datos del formulario
  onClear() {
    this.productoForm.reset();
  }

  // Método para rellenar los datos del formulario si el producto existe para su edición
  pathData() {
    // Obtener los datos del servicio compartido
    this.sharedDataService.productoData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      // Agregar el console.log para verificar el contenido del objeto 'data'
      console.log("Recibiendo datos en ProductDialogComponent:", data);

      if (data && data.producto && data.producto.idProducto) {
        this.actionTODO = Action.EDIT;
        this.titleButton = 'Editar';
        this.productoForm.patchValue({
          idProducto: data.producto.idProducto,
          nombre: data.producto.nombre,
          descripcion: data.producto.descripcion,
          idCategoria: data.producto.idCategoria
        });
        this.productoForm.updateValueAndValidity();
      } else {
        this.actionTODO = Action.NEW;
        this.titleButton = 'Guardar';
        this.productoForm.reset(); // Restablecer el formulario si no hay un producto para editar
      }
    });
  }
}