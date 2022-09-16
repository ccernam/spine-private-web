import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { DatatableModule } from "app/main/components/datatable/datatable.module";
import { MealFormComponent } from "./meal-form/meal-form.component";
import { MealListComponent } from "./meal-list/meal-list.component";
import { MealProductComponent } from "./meal-product/meal-product.component";

const routes: Routes = [
    {
        path: '',
        component: MealListComponent
    }
]

@NgModule({
    declarations: [
        MealListComponent,
        MealFormComponent,
        MealProductComponent
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

export class Meal { }