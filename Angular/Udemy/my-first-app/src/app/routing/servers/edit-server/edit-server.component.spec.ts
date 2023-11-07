import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServerComponent } from './edit-server.component';

describe('EditServerComponent', () => {
  let component: EditServerComponent;
  let fixture: ComponentFixture<EditServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServerComponent]
    });
    fixture = TestBed.createComponent(EditServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
