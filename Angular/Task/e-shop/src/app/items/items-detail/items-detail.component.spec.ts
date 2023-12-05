import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDetailComponent } from './items-detail.component';

describe('ItemsDetailComponent', () => {
  let component: ItemsDetailComponent;
  let fixture: ComponentFixture<ItemsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsDetailComponent]
    });
    fixture = TestBed.createComponent(ItemsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
