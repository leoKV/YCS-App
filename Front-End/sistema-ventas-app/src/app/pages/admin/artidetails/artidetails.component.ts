// Importaciones de módulos y clases
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductoDetalleResponse } from '../../../shared/models/producto.detalle.interface';
import { ProductoDetalleService } from './services/producto-detalle.service';
import Swal from 'sweetalert2';
import { ProductDetalleDialogComponent } from '../artiregister/components/product-detalle-dialog/product-detalle-dialog.component';
import { ImageUploadComponent } from '../artidetails/components/image-upload/image-upload.component';

// Enumeración para definir las acciones (nuevo, editar)
enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-artidetails',
  templateUrl: './artidetails.component.html',
  styleUrls: ['./artidetails.component.scss']
})
export class ArtidetailsComponent implements OnInit, OnDestroy {
  // Utilizado para manejar la desuscripción de observables
  private destroy$ = new Subject();

  // Arreglo para almacenar los detalles de producto
  detalles: ProductoDetalleResponse[] = [];

  // Variable para indicar la acción actual (nuevo o editar)
  actionTODO = Action.NEW;

  // Variable para el título del botón de acción
  titleButton = "Guardar";

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private productoDetalleService: ProductoDetalleService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto desde los parámetros de la URL
    const idProducto = this.activatedRoute.snapshot.queryParamMap.get('idProducto');

    if (idProducto) {
      // Obtener los detalles del producto usando el servicio
      this.listarDetalle(+idProducto);
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse de todos los observables al destruir el componente
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Método para obtener los detalles de un producto por su ID
  private listarDetalle(idProducto: number) {
    this.productoDetalleService.getDetalleProducto(idProducto)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (detalles) => {
          this.detalles = detalles;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // Método para eliminar un detalle de producto por su ID
  onDelete(idDetalleProducto: number) {
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
        // Llamar al servicio para eliminar el detalle de producto
        this.productoDetalleService.delete(idDetalleProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (res: any) => {
              // Mostrar mensaje de éxito en una snackbar
              this.snackBar.open(res.mensaje, '', {
                duration: 5000,
                panelClass: ['success-snackbar'],
                horizontalPosition: 'end',
                verticalPosition: 'top'
              });

              // Actualizar la lista de detalles de producto después de eliminar
              const idProducto = this.activatedRoute.snapshot.queryParamMap.get('idProducto');
              if (idProducto) {
                this.listarDetalle(+idProducto);
              }
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
  }

  // Método para abrir el diálogo de edición del detalle de producto
  onOpenModalDetalle(detalle: ProductoDetalleResponse) {
    const dialogRef = this.dialog.open(ProductDetalleDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Editar detalle de producto',
        productoDetalle: detalle
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

          // Actualizar la lista de detalles de producto después de editar
          const idProducto = this.activatedRoute.snapshot.queryParamMap.get('idProducto');
          if (idProducto) {
            this.listarDetalle(+idProducto);
          }
        }
      });
  }

  // Método para abrir el diálogo de carga de imágenes asociadas al detalle de producto
  onOpenModalImagenes(detalle: ProductoDetalleResponse) {
    console.log(detalle);
    // ImageUploadComponent.id
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      minWidth: '60%',
      data: {
        idDetalleProducto: detalle.idDetalleProducto
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

          // Actualizar la lista de detalles de producto después de cargar imágenes
          const idProducto = this.activatedRoute.snapshot.queryParamMap.get('idProducto');
          if (idProducto) {
            this.listarDetalle(+idProducto);
          }
        }
      });
  }
}