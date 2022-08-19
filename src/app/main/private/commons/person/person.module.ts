import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { DatatableModule } from "app/main/components/datatable/datatable.module";
import { PersonFormComponent } from "./person-form/person-form.component";
import { PersonListComponent } from "./person-list/person-list.component";

const routes : Routes = [
    {
        path : '',
        component : PersonListComponent
    }
]

@NgModule({
    declarations: [
        PersonListComponent,
        PersonFormComponent
    ],
    imports : [
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

export class Person { }