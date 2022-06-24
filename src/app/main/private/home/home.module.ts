import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { HomeComponent } from './home.component';

const routes = [
   {
      path: 'home',
      component: HomeComponent
   }
];

@NgModule({
   declarations: [HomeComponent],
   imports: [
      RouterModule.forChild(routes),
      ContentHeaderModule,
      TranslateModule,
      CoreCommonModule
   ],
   exports: [HomeComponent]
})
export class HomeModule { }
