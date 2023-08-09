import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../admin/artiregister/services/producto.service';
import { ProductoDetalleService } from '../../../admin/artidetails/services/producto-detalle.service';
import { ProductoDetalleResponse } from '../../../../shared/models/producto.detalle.interface';
import { ProductoResponse } from '../../../../shared/models/producto.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-artiview',
  templateUrl: './artiview.component.html',
  styleUrls: ['./artiview.component.scss']
})
export class ArtiviewComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  // Arreglos para almacenar productos, categorías y detalles de producto
  productos: ProductoResponse[] = [];
  detalles: ProductoDetalleResponse[] = [];
  idProductoFromUrl: number = -1;
  detallesPorProducto: { [productId: number]: ProductoDetalleResponse } = {};

  constructor(
    private productoSvc: ProductoService,
    private productoDetalleService: ProductoDetalleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto desde los parámetros de la URL
    const idProducto = this.activatedRoute.snapshot.queryParamMap.get('idProducto');

    if (idProducto) {
      // Sobrescribir el valor predeterminado con el valor real
      this.idProductoFromUrl = +idProducto;
      this.listarDetalle(this.idProductoFromUrl);
      this.listar(this.idProductoFromUrl);
    }


  }

  ngOnDestroy(): void {
    // Desuscribirse de todos los observables al destruir el componente
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // Método para obtener la lista de productos
  private listar(idProducto: number) {
    this.productoSvc.getProducto(idProducto).pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      this.productos = productos;
    });
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

  // Método para obtener los detalles de producto por producto
  private obtenerDetallesPorProducto() {
    this.productoSvc.getProductos().pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      productos.forEach(producto => {
        const detallesProducto = this.detalles.filter(detalle => detalle.idProducto === producto.idProducto);
        if (detallesProducto.length > 0) {
          this.detallesPorProducto[producto.idProducto] = detallesProducto[0];
        }
      });
    });
  }
}


