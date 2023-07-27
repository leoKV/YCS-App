import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cateregister',
  templateUrl: './cateregister.component.html',
  styleUrls: ['./cateregister.component.scss']
})
export class CateregisterComponent implements OnInit {

  nuevaCategoriaForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService
  ) {
    // Inicializa nuevaCategoriaForm en el constructor
    this.nuevaCategoriaForm = this.formBuilder.group({

      //Validaciones
      nombre: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      ]]
    });
  }

  ngOnInit() {}

  registrarCategoria() {
    // Validar si el formulario es válido antes de enviar la solicitud
    if (this.nuevaCategoriaForm.valid) {
      // Datos de la nueva categoría
      const nuevaCategoria = {
        nombre: this.nuevaCategoriaForm.get('nombre')?.value,
        descripcion: this.nuevaCategoriaForm.get('descripcion')?.value
      };

      // Llama al servicio para agregar la nueva categoría
      this.categoriasService.agregarCategoria(nuevaCategoria).subscribe(
        (response: any) => {

          // Mostrar SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Categoría registrada',
            text: 'La categoría se ha registrado correctamente.',
            showConfirmButton: false,
            timer: 2000 // Duración de la alerta en milisegundos (2 segundos en este caso)
          });
          console.log('Categoría registrada correctamente:', response.mensaje);
          // Vaciar los campos del formulario después de registrar la categoría
          this.nuevaCategoriaForm.reset();
        },
        (error) => {
          // Manejo de errores en caso de que ocurra un problema al registrar la categoría.
          console.error('Error al registrar la categoría:', error);

          // Mostrar SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar la categoría',
            text: 'Ocurrió un error al registrar la categoría. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
}