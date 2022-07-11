import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BranchesComponent } from './branches/branches.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { BranchComponent } from './branch/branch.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductsComponent } from './products/products.component';

// routing
const routes: Routes = [
  {
    path: 'branches',
    component: BranchesComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'warehouses',
    component: WarehousesComponent,
  }
];

@NgModule({
  declarations: [
    BranchesComponent,
    CategoriesComponent,
    CategoryComponent,
    BranchComponent,
    WarehousesComponent,
    WarehouseComponent,
    ProductsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
  ]
})
export class CommonsModule { }
