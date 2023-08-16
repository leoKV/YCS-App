import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigeneralComponent } from './artigeneral.component';

describe('ArtigeneralComponent', () => {
  let component: ArtigeneralComponent;
  let fixture: ComponentFixture<ArtigeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtigeneralComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArtigeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});