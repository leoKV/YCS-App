import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from '../services/categorias.service';
import { CateResponse } from '../../../shared/models/categeneral.intercafe';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CateDialogComponent } from '../categeneral/components/cate-dialog/cate-dialog.component';
import { DefaultResponse } from '../../../shared/models/default.interface';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categeneral',
  templateUrl: './categeneral.component.html',
  styleUrls: ['./categeneral.component.scss']
})
export class CategeneralComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  categorias: CateResponse[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  private listarCategorias() {
    const token = this.categoriasService.getTokenFromSession();
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}` // Agregar el token en el encabezado Authorization
        })
      };

      this.categoriasService.getCategorias().pipe(takeUntil(this.destroy$)).subscribe(
        (categorias: CateResponse[]) => {
          this.categorias = categorias;
        },
        (error) => {
          console.error('Error al obtener las categorías:', error);
        }
      );
    } else {
      console.error('Token de autenticación: null');
    }
  }

  onOpenModal(categoria = {}) {
    const dialogRef = this.dialog.open(CateDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro de categorías',
        categoria
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listarCategorias();
          this.snackBar.open(result.mensaje, '', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  onDelete(idCategoria: number) {
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
        this.categoriasService.eliminarCategoria(idCategoria).subscribe(
          (res: DefaultResponse) => {
            this.snackBar.open(res.mensaje, '', {
              duration: 5 * 1000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.listarCategorias();
          },
          (error) => {
            console.error('Error al eliminar la categoría:', error);
          }
        );
      }
    });
  }
}
