import { TestBed } from '@angular/core/testing';

import { ProductoDetalleService } from './producto-detalle.service';

describe('ProductoDetalleService', () => {
  let service: ProductoDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
