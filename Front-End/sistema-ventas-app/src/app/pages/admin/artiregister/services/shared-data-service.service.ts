import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {
  private productoDataSubject = new BehaviorSubject<any>(null);
  productoData$ = this.productoDataSubject.asObservable();

  setProductoData(data: any) {
    console.log('Enviando datos al servicio compartido:', data);
    this.productoDataSubject.next(data);
  }
}