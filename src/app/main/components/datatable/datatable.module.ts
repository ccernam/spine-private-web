import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CsvModule } from '@ctrl/ngx-csv';

import { CoreCommonModule } from '@core/common.module';

import { DatatableComponent } from './datatable.component';

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    NgbModule,
    CoreCommonModule,
    NgxDatatableModule,
    CsvModule
  ],
  exports: [DatatableComponent]
})
export class DatatableModule {}
