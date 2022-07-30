import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMovementDetailComponent } from './product-movement-detail.component';

describe('ProductMovementDetailComponent', () => {
  let component: ProductMovementDetailComponent;
  let fixture: ComponentFixture<ProductMovementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMovementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMovementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
