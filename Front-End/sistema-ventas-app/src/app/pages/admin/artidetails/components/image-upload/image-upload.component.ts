import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoDetalleResponse } from '../../../../../shared/models/producto.detalle.interface';
import { ProductoDetalleService } from '../../services/producto-detalle.service';
import { Imagen } from '../../../../../shared/models/imagen.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  imagenes: File[] = []; // Arreglo que almacena las imágenes cargadas
  dragging = false; // Bandera para indicar si se está arrastrando una imagen
  sub1: Subscription = Subscription.EMPTY;
  @Input()
  idDetalleProducto=0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductoDetalleResponse | null, // Datos del detalle del producto que se pasan al abrir el diálogo
    private dialogRef: MatDialogRef<ImageUploadComponent>,
    private productoService: ProductoDetalleService // Referencia al diálogo actual
  ) { 
    if (this.data && this.data.idDetalleProducto) {
      this.idDetalleProducto = this.data.idDetalleProducto;
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub1 && this.sub1.unsubscribe();
  }

  // Evento que se dispara al soltar una imagen sobre el área de carga
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    this.handleFiles(event.dataTransfer?.files ?? null);
  }

  // Evento que se dispara cuando una imagen se está arrastrando sobre el área de carga
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  // Evento que se dispara cuando una imagen deja de ser arrastrada sobre el área de carga
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
  }

  // Evento que se dispara cuando se selecciona una imagen desde el cuadro de diálogo de archivos
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.handleFiles(inputElement?.files ?? null);
  }

  // Método privado para manejar los archivos seleccionados o arrastrados
  private handleFiles(files: FileList | null) {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.imagenes.push(files[i]); // Agregar las imágenes al arreglo de imágenes cargadas
      }
    }
  }

  // Método para eliminar una imagen de las imágenes cargadas
  eliminarImagen(imagen: File) {
    const index = this.imagenes.indexOf(imagen);
    if (index !== -1) {
      this.imagenes.splice(index, 1); // Eliminar la imagen del arreglo de imágenes cargadas
    }
  }

  // Método para guardar las imágenes en el servidor (lógica de ejemplo)
  guardarImagenes() {
    // Aquí se implementa la lógica para guardar las imágenes en el servidor
    this.sub1 = this.productoService
    .insertarImagenes({
      idDetalleProducto: this.idDetalleProducto,
      imagenes: this.imagenes
    }).subscribe({
      next: (response) => {
        console.log(response);
      }, 
      error:  (e) => {console.error(e)}}
    );
    // Cerrar el modal con el mensaje de éxito
    this.dialogRef.close({ mensaje: 'Imágenes guardadas correctamente' });
  }
}