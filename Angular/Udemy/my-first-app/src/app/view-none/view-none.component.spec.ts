import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoneComponent } from './view-none.component';

describe('ViewNoneComponent', () => {
  let component: ViewNoneComponent;
  let fixture: ComponentFixture<ViewNoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNoneComponent]
    });
    fixture = TestBed.createComponent(ViewNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
