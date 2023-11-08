import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObervableComponent } from './obervable.component';

describe('ObervableComponent', () => {
  let component: ObervableComponent;
  let fixture: ComponentFixture<ObervableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObervableComponent]
    });
    fixture = TestBed.createComponent(ObervableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
