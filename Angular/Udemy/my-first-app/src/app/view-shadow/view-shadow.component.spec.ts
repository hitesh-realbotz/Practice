import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShadowComponent } from './view-shadow.component';

describe('ViewShadowComponent', () => {
  let component: ViewShadowComponent;
  let fixture: ComponentFixture<ViewShadowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShadowComponent]
    });
    fixture = TestBed.createComponent(ViewShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
