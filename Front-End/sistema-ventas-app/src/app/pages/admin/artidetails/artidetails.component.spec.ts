import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtidetailsComponent } from './artidetails.component';

describe('ArtidetailsComponent', () => {
  let component: ArtidetailsComponent;
  let fixture: ComponentFixture<ArtidetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtidetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
