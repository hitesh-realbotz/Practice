import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTdComponent } from './forms-td.component';

describe('FormsTdComponent', () => {
  let component: FormsTdComponent;
  let fixture: ComponentFixture<FormsTdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsTdComponent]
    });
    fixture = TestBed.createComponent(FormsTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
