// Importaciones de módulos y clases
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Enumeración para definir las acciones (nuevo, editar)
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
  // Utilizado para manejar la desuscripción de observables
  private destroy$ = new Subject();

  // Arreglos para almacenar productos, categorías y detalles de producto
  productos: ProductoResponse[] = [];
  categorias: CategoriaResponse[] = [];
  detalles: ProductoDetalleResponse[] = [];

  // Variable para indicar la acción actual (nuevo o editar)
  actionTODO = Action.NEW;

  // Definir las columnas para la tabla
  columns: any[] = [
    { prop: 'nombre', name: 'Nombre', sortable: true, width: 200 },
    { prop: 'nombreCategoria', name: 'Categoría', sortable: true, width: 200 },
    { prop: 'fecha_Registro', name: 'Fecha Registro', sortable: true, width: 150 },
    { prop: 'nombreUsuario', name: 'Responsable Registro', sortable: true, width: 200 },
    { name: 'Acciones', cellTemplate: null, width: 250 }
  ];

  // Referencia a la tabla ngx-datatable
  @ViewChild('table') table: any;

  // Variables para los filtros
  filterNombre: string = '';
  filterCategoria: string = '';
  filterFecha: string = '';
  filterResponsable: string = '';

  constructor(
    private productoSvc: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener la lista de productos y categorías al inicializar el componente
    this.listar();
    this.productoSvc.getCategorias().pipe(takeUntil(this.destroy$)).subscribe((categorias: CategoriaResponse[]) => {
      this.categorias = categorias;
    });
  }

  // Método para obtener la lista de productos
  private listar() {
    this.productoSvc.getProductos().pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      this.productos = productos;
    });
  }

  // Método para abrir el diálogo de registro o edición de productos
  onOpenModal(producto?: ProductoResponse) {
    const data = {
      title: this.actionTODO === Action.NEW ? 'Registro de productos' : 'Editar producto',
      producto: producto || null,
    };

    this.sharedDataService.setProductoData(data);

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      minWidth: '60%',
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          // Actualizar la lista de productos después de guardar o editar
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

  // Método para abrir el diálogo de registro de detalles de producto
  onOpenModalDetalle(idProducto: number) {
    const dialogRef = this.dialog.open(ProductDetalleDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro del detalle de producto',
        idProducto: idProducto
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          // Mostrar mensaje de éxito en una snackbar
          this.snackBar.open(result.mensaje, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });

          // Redirigir a la vista de detalles de producto después de guardar el detalle
          this.router.navigate(['/articulos/detail'], { queryParams: { idProducto: idProducto } });
        }
      });
  }

  ngOnDestroy(): void {
    // Desuscribirse de todos los observables al destruir el componente
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Método para eliminar un producto por su ID
  onDelete(idProducto: number) {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar
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
        // Llamar al servicio para eliminar el producto
        this.productoSvc.delete(idProducto).subscribe((res: DefaultResponse) => {
          // Mostrar mensaje de éxito en una snackbar
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

  // Métodos para aplicar filtros en la tabla
  onFilterNombre(value: string) {
    this.filterNombre = value;
    this.table.offset = 0;
  }

  onFilterCategoria(value: string) {
    this.filterCategoria = value;
    this.table.offset = 0;
  }

  onFilterFecha(value: string) {
    this.filterFecha = value;
    this.table.offset = 0;
  }

  onFilterResponsable(value: string) {
    this.filterResponsable = value;
    this.table.offset = 0;
  }

  // Método para navegar a la vista de detalles de producto
  onGoToDetails(idProducto: number) {
    this.router.navigate(['/articulos/detail'], { queryParams: { idProducto: idProducto } });
  }
}