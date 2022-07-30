import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
    {
        path : 'product-movement',
        loadChildren: () => import('./product-movement/product-movement.module').then(m => m.ProductMovement)
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})

export class LogisticsModule { }