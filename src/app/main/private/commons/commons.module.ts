import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { StocksComponent } from './stocks/stocks.component';
import { PricesComponent } from './prices/prices.component';
import { DatatableModule } from 'app/main/components/datatable/datatable.module';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrencyComponent } from './currency/currency.component';
import { ProductComponent } from './product/product.component';

// routing
const routes: Routes = [
  {
    path: 'currencies',
    component: CurrenciesComponent,
  },
  {
    path: 'branches',
    component: BranchesComponent,
  },
  {
    path: 'warehouses',
    component: WarehousesComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'measurement-units',
    component: MeasurementUnitsComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then(m => m.Person)
  },
];

@NgModule({
  declarations: [
    BranchesComponent,
    CategoriesComponent,
    CategoryComponent,
    BranchComponent,
    WarehousesComponent,
    WarehouseComponent,
    ProductsComponent,
    StocksComponent,
    PricesComponent,
    MeasurementUnitsComponent,
    MeasurementUnitComponent,
    CurrenciesComponent,
    CurrencyComponent,
    ProductComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    DatatableModule,
    NgSelectModule
  ]
})
export class CommonsModule { }
