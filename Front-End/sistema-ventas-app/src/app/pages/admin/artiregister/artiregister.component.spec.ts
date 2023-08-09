import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiregisterComponent } from './artiregister.component';

describe('ArtiregisterComponent', () => {
  let component: ArtiregisterComponent;
  let fixture: ComponentFixture<ArtiregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtiregisterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArtiregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});