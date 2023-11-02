import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmulComponent } from './view-emul.component';

describe('ViewEmulComponent', () => {
  let component: ViewEmulComponent;
  let fixture: ComponentFixture<ViewEmulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmulComponent]
    });
    fixture = TestBed.createComponent(ViewEmulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
