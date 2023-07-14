import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategeneralComponent } from './categeneral.component';

describe('CategeneralComponent', () => {
  let component: CategeneralComponent;
  let fixture: ComponentFixture<CategeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
