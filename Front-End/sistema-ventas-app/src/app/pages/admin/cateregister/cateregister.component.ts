import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CategoriasService } from '../../auth/services/categorias.service';

@Component({
  selector: 'app-cateregister',
  templateUrl: './cateregister.component.html',
  styleUrls: ['./cateregister.component.scss']
})
export class CateregisterComponent  {
  nombreCategoria: string = '';
  descripcionCategoria: string = '';

  // Crea el FormGroup para el formulario
  nuevaCategoriaForm = new FormGroup({
    nombreFormControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcionFormControl: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private categoriasService: CategoriasService) { }

  // Método para registrar la categoría
  registrarCategoria() {
    // Verifica si el formulario es válido
    if (this.nuevaCategoriaForm.valid) {
      // Datos de la nueva categoría
      const nuevaCategoria = {
        nombre: this.nombreCategoria,
        descripcion: this.descripcionCategoria,
      };

      // Llama al servicio para agregar la nueva categoría
      this.categoriasService.agregarCategoria(nuevaCategoria).subscribe(
        (response: any) => {
          // La categoría se registró correctamente, puedes mostrar el mensaje de éxito en la respuesta
          console.log('Categoría registrada correctamente:', response.mensaje);
        },
        (error) => {
          // Manejo de errores en caso de que ocurra un problema al registrar la categoría.
          console.error('Error al registrar la categoría:', error);
        }
      );
    }
  }
}
