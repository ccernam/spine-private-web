import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableAction, DatatableColumn, DatatableColumnCustom, DatatableColumnCustomValue, DatatableColumnType } from 'app/core/types/datatable';

@Component({
   selector: 'app-datatable',
   templateUrl: './datatable.component.html',
   styleUrls: ['./datatable.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit {
   @Input() add: boolean = true;
   @Input() search: boolean = true;
   @Input() export: boolean = false;
   @Input() limit: boolean = false;
   @Input() selectedLimit: number = 10;
   @Input() class: string = '';

   @Input() rows: any[] = [];
   @Input() columns: DatatableColumn[] = [];
   @Input() actions: DatatableAction[] = [];
   @Output() create: EventEmitter<any> = new EventEmitter<any>();
   @Output() edit: EventEmitter<any> = new EventEmitter<any>();
   @Output() action: EventEmitter<any> = new EventEmitter<any>();

   messages: any = {
      emptyMessage: 'No se encontraron registros',
      totalMessage: 'registros',
      selectedMessage: 'Seleccionado'
   }

   // Private
   private isFilter: boolean = false;
   private tempData: any[] = [];

   // public
   public ColumnMode = ColumnMode;
   public ColumnType = DatatableColumnType;

   ngOnInit() { }

   getClassBadgeCell(row: any, custom?: DatatableColumnCustom) {
      const name: string = custom?.name ?? '';
      const values: DatatableColumnCustomValue[] = custom?.values ?? [];
      const value = values.find((item: DatatableColumnCustomValue) => item.value === row[name]);
      return value?.class ?? 'badge-info';
   }

   filterUpdate(event: any) {
      if (!this.isFilter) {
         this.tempData = JSON.parse(JSON.stringify(this.rows));
         this.isFilter = true;
      }

      const val: string = event.target.value?.toString().toLowerCase() ?? '';

      const temp: any[] = this.tempData.filter((item: any) => {
         return this.columns.filter((column: DatatableColumn) => item[column.name]?.toString().toLowerCase().indexOf(val) !== -1).length > 0;
         // return item.name.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.rows = temp;
   }

   emitCreate() {
      this.create.emit();
   }

   emitEdit(event: any, name: string, row: any) {
      this.edit.emit({ value: event.target.value, name, row });
   }

   emitAction(name: string, index: number, row: any) {
      this.action.emit({ name, index, row });
   }
}
