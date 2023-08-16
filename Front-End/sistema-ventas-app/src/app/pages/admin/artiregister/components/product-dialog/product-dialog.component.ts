// Importar módulos y dependencias de Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CategoriaResponse } from '../../../../../shared/models/categoria.interface';
import { ProductoResponse } from '../../../../../shared/models/producto.interface';
import { ProductoService } from '../../services/producto.service';
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
  private destroy$ = new Subject<void>();

  // Propiedades públicas
  categorias: CategoriaResponse[] = [];
  actionTODO = Action.NEW;
  titleButton = 'Guardar';

  // Título del diálogo
  title: string = 'Registro de productos';

  // Inicializar el formulario del producto utilizando FormBuilder
  productoForm: FormGroup;

  // Constructor con inyección de dependencias
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productoSvc: ProductoService,
    private sharedDataService: SharedDataService // Inyectar el servicio compartido
  ) {
    // Inicializar el formulario del producto utilizando FormBuilder
    this.productoForm = this.fb.group({
      idProducto: [''],
      nombre: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      idCategoria: ['', [Validators.required]],
      idRegistro: [''],
    });
  }

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
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para guardar los datos del producto según el tipo de acción (NEW o EDIT)
  onSave() {
    if (this.productoForm.invalid) {
      // Mostrar mensajes de error usando MatSnackBar
      this.showSnackbarErrors();
      return;
    }

    const formValues = this.productoForm.getRawValue();

    if (this.actionTODO === Action.NEW) {
      // Crear un nuevo objeto de producto para agregarlo
      const newProducto: ProductoResponse = {
        idProducto: 0,
        nombre: formValues.nombre ? formValues.nombre : '',
        descripcion: formValues.descripcion ? formValues.descripcion : '',
        idCategoria: formValues.idCategoria ? parseInt(formValues.idCategoria) : 0,
        nombreCategoria: '',
        nombreUsuario: ''
      };

      // Llamar al método del servicio para agregar el nuevo producto y cerrar el diálogo
      this.productoSvc.new(newProducto).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    } else {
      // Actualizar los datos del producto existente según los cambios realizados
      const updateProducto: ProductoResponse = {
        idProducto: formValues.idProducto ? parseInt(formValues.idProducto) : 0,
        nombre: formValues.nombre ? formValues.nombre : '',
        descripcion: formValues.descripcion ? formValues.descripcion : '',
        idCategoria: formValues.idCategoria ? parseInt(formValues.idCategoria) : 0,
        nombreCategoria: '',
        nombreUsuario: ''
      };

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

  // Método para mostrar mensajes de error usando MatSnackBar
  showSnackbarErrors() {
    if (this.productoForm?.get('nombre')?.invalid) {
      this.snackBar.open('El nombre es requerido y debe tener entre 10 y 150 caracteres', 'Cerrar', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    }

    if (this.productoForm?.get('descripcion')?.invalid) {
      this.snackBar.open('La descripción es requerida y debe tener entre 10 y 500 caracteres', 'Cerrar', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    }

    if (this.productoForm?.get('idCategoria')?.invalid) {
      this.snackBar.open('Debe seleccionar una categoría', 'Cerrar', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    }
  }
}