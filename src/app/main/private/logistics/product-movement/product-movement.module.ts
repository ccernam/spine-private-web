import { NgModule } from '@angular/core'
import { ProductMovementListComponent } from './product-movement-list/product-movement-list.component'
import { ProductMovementFormComponent } from './product-movement-form/product-movement-form.component'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CoreCommonModule } from '@core/common.module'
import { DatatableModule } from 'app/main/components/datatable/datatable.module'
import { NgSelectModule } from '@ng-select/ng-select'

const routes : Routes = [
    {
        path: '',
        component: ProductMovementListComponent
    }
]

@NgModule({
    declarations: [
        ProductMovementListComponent,
        ProductMovementFormComponent
    ],
    imports: [
        CommonModule,
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

export class ProductMovement { }