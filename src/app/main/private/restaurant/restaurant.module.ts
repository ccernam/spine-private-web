import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    {
        path : 'meal',
        loadChildren: () => import('./meal/meal.module').then(m => m.Meal)
    }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class RestaurantModule { }