import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableAction, DatatableColumn } from 'app/core/types/datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit {
  @Input() rows: any[] = [];
  @Input() columns: DatatableColumn[] = [];
  @Input() actions: DatatableAction[] = [];
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
  public selectedLimit: number = 10;

  /**
   * On init
   */
  ngOnInit() { }

  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    if(!this.isFilter) {
      this.tempData = JSON.parse(JSON.stringify(this.rows));
      this.isFilter = true;
    }

    const val = event.target.value.toLowerCase();

    const temp: any[] = this.tempData.filter((item: any) => {
      return item.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
  }

  emitAction({ name, index, row }) {
    this.action.emit({ name, index, row });
  }
}
