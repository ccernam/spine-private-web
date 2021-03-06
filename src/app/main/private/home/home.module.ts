import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

// routing
const routes = [
   {
      path: '',
      component: HomeComponent
   }
];

@NgModule({
   declarations: [
      HomeComponent
   ],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ContentHeaderModule,
      NgbModule,
      CoreCommonModule
   ]
})
export class HomeModule { }
