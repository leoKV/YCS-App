import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {
  // Se crea un BehaviorSubject para almacenar y compartir los datos.
  // BehaviorSubject es un tipo de Observable que siempre tiene un valor actual
  // y emite automáticamente el último valor a los nuevos suscriptores.
  private productoDataSubject = new BehaviorSubject<any>(null);
  productoData$ = this.productoDataSubject.asObservable();

  // Método para establecer los datos del producto en el BehaviorSubject.
  // Se utiliza para enviar datos desde un componente a otros componentes que estén suscritos.
  setProductoData(data: any) {

    // Se actualiza el valor del BehaviorSubject con los datos proporcionados.
    this.productoDataSubject.next(data);
  }
}