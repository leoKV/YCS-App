import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiviewComponent } from './artiview.component';

describe('ArtiviewComponent', () => {
  let component: ArtiviewComponent;
  let fixture: ComponentFixture<ArtiviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtiviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtiviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
