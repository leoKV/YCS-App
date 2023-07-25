import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetalleDialogComponent } from './product-detalle-dialog.component';

describe('ProductDetalleDialogComponent', () => {
  let component: ProductDetalleDialogComponent;
  let fixture: ComponentFixture<ProductDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetalleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
