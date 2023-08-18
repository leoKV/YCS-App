import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductoService } from '../admin/artiregister/services/producto.service';
import { ProductoDetalleService } from '../admin/artidetails/services/producto-detalle.service';
import { ProductoResponse } from '../../shared/models/producto.interface';
import { ProductoDetalleResponse } from '../../shared/models/producto.detalle.interface';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Imagen } from '../../shared/models/imagen.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  // Arreglos para almacenar productos, categorías y detalles de producto
  productos: ProductoResponse[] = [];
  detalles: ProductoDetalleResponse[] = [];
  imagenes: Imagen[]=[];

  constructor(
    private productoSvc: ProductoService,
    private productoDetalleService: ProductoDetalleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarDetalle();
    this.listar();
  }

  ngOnDestroy(): void {
    // Desuscribirse de todos los observables al destruir el componente
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Método para obtener la lista de productos
  private listar() {
    this.productoSvc.getProductos().pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      this.productos = productos;
    });
  }

  // Método para obtener los detalles de los productos
  private listarDetalle() {
    this.productoDetalleService.getDetalleProductos()
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

  tieneDetalle(idProducto: number): boolean {
    return this.detalles.some(detalle => detalle.idProducto === idProducto);
  }

  obtenerDetalles(idProducto: number): ProductoDetalleResponse[] {
    return this.detalles.filter(detalle => detalle.idProducto === idProducto);
  }
  
  obtenerImagen(idDetalle: number): Imagen[] {
    return this.imagenes.filter(detalle => detalle.idDetalleProducto === idDetalle);
  }
  
    // Método para navegar a la vista de detalles de producto
    onGoToDetails(idProducto: number) {
      this.router.navigate(['/articulos/view'], { queryParams: { idProducto: idProducto } });
    }
}