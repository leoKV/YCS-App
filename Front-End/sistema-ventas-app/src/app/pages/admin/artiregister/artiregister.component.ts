// Importar módulos y componentes necesarios
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../artiregister/services/producto.service';
import { ProductoResponse } from '../../../shared/models/producto.interface';
import { ProductoDetalleResponse } from '../../../shared/models/producto.detalle.interface';
import { Subject, takeUntil } from 'rxjs';
import { CategoriaResponse } from '../../../shared/models/categoria.interface';
import { DefaultResponse } from '../../../shared/models/default.interface';
import { ProductDialogComponent } from '../artiregister/components/product-dialog/product-dialog.component';
import { SharedDataService } from './services/shared-data-service.service';
import { ProductDetalleDialogComponent } from './components/product-detalle-dialog/product-detalle-dialog.component';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

// Enumeración para representar las acciones (NEW: nuevo, EDIT: editar)
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
  // Crear una variable de tipo Subject para gestionar la desuscripción
  private destroy$ = new Subject();

  // Arreglos para almacenar datos de productos, categorías y detalles
  productos: ProductoResponse[] = [];
  categorias: CategoriaResponse[] = [];
  detalles: ProductoDetalleResponse[] = [];

  // Variable para controlar la acción a realizar (nuevo o editar)
  actionTODO = Action.NEW;

  // Constructor con inyección de dependencias
  constructor(
    private productoSvc: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private sharedDataService: SharedDataService // Inyectar el servicio compartido
  ) { }

  ngOnInit(): void {
    // Llamar al método para obtener la lista de productos
    this.listar();
    this.listarDetalle();

    // Obtener las categorías del servicio usando RxJS 'takeUntil' para gestionar las suscripciones
    this.productoSvc.getCategorias().pipe(takeUntil(this.destroy$)).subscribe((categorias: CategoriaResponse[]) => {
      this.categorias = categorias;
    });
  }

  // Método privado para obtener la lista de productos
  private listar() {
    this.productoSvc.getProductos().pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      this.productos = productos;
    });
  }

  // Método privado para obtener la lista de detalles de productos
  private listarDetalle() {
    this.productoSvc.getDetalleProductos().pipe(takeUntil(this.destroy$)).subscribe((detalles) => {
      this.detalles = detalles;
    });
  }

  // Método para abrir el diálogo para agregar o editar un producto
  onOpenModal(producto?: ProductoResponse) {
    // Definir los datos que se enviarán al diálogo
    const data = {
      title: this.actionTODO === Action.NEW ? 'Registro de productos' : 'Editar producto',
      producto: producto || null,
    };

    this.sharedDataService.setProductoData(data);

    // Abrir el diálogo usando el componente ProductDialogComponent
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      minWidth: '60%',
    });

    // Suscribirse al resultado del diálogo después de cerrarse
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          // Si se obtiene un resultado válido, actualizar la lista de productos y mostrar un mensaje de éxito
          this.listar();
          this.snackBar.open(result.mensaje, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
  }

  // Método para abrir el diálogo para registrar un detalle de producto
  onOpenModalDetalle(idProducto: number) {
    const dialogRef = this.dialog.open(ProductDetalleDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro del detalle de producto',
        idProducto: idProducto // Pasar el idProducto como propiedad del objeto de datos
      }
    });

    // Suscribirse al resultado del diálogo después de cerrarse
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listarDetalle();
          this.snackBar.open(result.mensaje, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }
      });
  }

  // Método para desuscribirse y evitar pérdidas de memoria al destruir el componente
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Método para eliminar un producto por su ID
  onDelete(idProducto: number) {
    Swal.fire({
      title: '',
      text: '¿Realmente desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'darkBlue',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al método del servicio para eliminar el producto y mostrar un mensaje de éxito
        this.productoSvc.delete(idProducto).subscribe((res: DefaultResponse) => {
          this.snackBar.open(res.mensaje, '', {
            duration: 5 * 1000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          // Actualizar la lista de productos después de eliminar
          this.listar();
        });
      }
    });
  }
}