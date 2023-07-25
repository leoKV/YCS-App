import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../artigeneral/services/producto.service';
import { ProductoResponse } from '../../../shared/models/producto.interface';
import { ProductoDetalleResponse } from '../../../shared/models/producto.detalle.interface';
import { Subject, takeUntil } from 'rxjs';
import { CategoriaResponse } from '../../../shared/models/categoria.interface';
import { DefaultResponse } from '../../../shared/models/default.interface';
import Swal from 'sweetalert2';
import { ProductDetalleDialogComponent } from '../artigeneral/components/product-detalle-dialog/product-detalle-dialog.component';


@Component({
  selector: 'app-artigeneral',
  templateUrl: './artigeneral.component.html',
  styleUrls: ['./artigeneral.component.scss']
})
export class ArtigeneralComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  productos: ProductoResponse[] = [];
  categorias: CategoriaResponse[] = [];
  productoDetalle: ProductoDetalleResponse[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productoSvc: ProductoService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  // Variable para controlar si el detalle del producto está registrado o no
  detalleRegistrado: boolean = false;

  ngOnInit(): void {
    this.listar();
    this.productoSvc.getCategorias().pipe(takeUntil(this.destroy$)).subscribe((categorias: CategoriaResponse[]) => {
      this.categorias = categorias;
    });
    // Verificar si existe algún detalle registrado
    this.detalleRegistrado = this.data?.productoDetalle !== null && this.data?.productoDetalle !== undefined;
  }

  private listar() {
    this.productoSvc.getProductos().pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      this.productos = productos;
    });
  }

  /*onOpenModal(producto = {}) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro de productos',
        producto
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listar();
          this.snackBar.open(result.mensaje, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }
      });
  }*/

  onOpenModalDetalle(idProducto: number) {
    const dialogRef = this.dialog.open(ProductDetalleDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro del detalle de producto',
        idProducto: idProducto // Pasar el idProducto como propiedad del objeto de datos
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listar();
          this.snackBar.open(result.mensaje, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }
      });
  }



  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

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
        this.productoSvc.delete(idProducto).subscribe((res: DefaultResponse) => {
          this.snackBar.open(res.mensaje, '', {
            duration: 5 * 1000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          })
          this.listar();
        });
      }
    });
  }

  onDeleteDetalle(idProductoDetalle: number) {
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
        this.productoSvc.delete(idProductoDetalle).subscribe((res: DefaultResponse) => {
          this.snackBar.open(res.mensaje, '', {
            duration: 5 * 1000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          })
          this.listar();
        });
      }
    });
  }
}
