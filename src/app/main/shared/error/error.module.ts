import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { NotFoundComponent } from './404/404.component';


// routing
const routes: Routes = [
   {
      path: '404',
      component: NotFoundComponent,
      data: { animation: 'error' }
   }
];

@NgModule({
   declarations: [NotFoundComponent],
   imports: [CommonModule, RouterModule.forChild(routes), CoreCommonModule]
})
export class ErrorModule { }
