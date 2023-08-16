import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './services/usuario.service';
import { UsuarioResponse } from '../../../shared/models/usuario.interface';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../users/components/user-dialog/user-dialog.component';
import { DefaultResponse } from 'src/app/shared/models/default.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  usuarios: UsuarioResponse[] = [];
  constructor(private usuarioSvc: UsuarioService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.listar();
  }

  private listar() {
    this.usuarioSvc.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  onOpenModal(user = {}) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registro de usuarios',
        user
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

  onDelete(idUsuario: number) {
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
        this.usuarioSvc.delete(idUsuario).subscribe((res: DefaultResponse) => {
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
