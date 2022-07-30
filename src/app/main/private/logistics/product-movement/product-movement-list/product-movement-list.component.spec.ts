import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMovementListComponent } from './product-movement-list.component';

describe('ProductMovementListComponent', () => {
  let component: ProductMovementListComponent;
  let fixture: ComponentFixture<ProductMovementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMovementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMovementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
