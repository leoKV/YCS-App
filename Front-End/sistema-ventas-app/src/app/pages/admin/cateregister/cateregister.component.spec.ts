import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateregisterComponent } from './cateregister.component';

describe('CateregisterComponent', () => {
  let component: CateregisterComponent;
  let fixture: ComponentFixture<CateregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
