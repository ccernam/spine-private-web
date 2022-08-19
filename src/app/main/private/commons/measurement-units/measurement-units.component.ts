import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementUnitDto } from 'app/core/dtos/commons/measurement-unit.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { MeasurementUnitComponent } from '../measurement-unit/measurement-unit.component';

@Component({
  selector: 'app-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss']
})
export class MeasurementUnitsComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _loadingService: LoadingService,
    private _globalService: GlobalService,
    private _modalService: NgbModal
  ) { }

  public measurementUnitDtos: MeasurementUnitDto[] = [];

  public columns: DatatableColumn[] = [
    {
      name: 'name',
      title: 'Nombre',
      width: 1000
    },
    {
      name: 'symbol',
      title: 'Símbolo',
      width: 250
    },
    {
      name: 'isoCode',
      title: 'Código Iso',
      width: 250
    },
    {
      name: 'statusName',
      title: 'Estado',
      width: 160,
      class: 'justify-content-center',
      custom: {
        name: 'status',
        values: [
          { value: 1, class: 'badge-success' },
          { value: 2, class: 'badge-danger' },
        ],
        type: DatatableColumnType.badge
      }
    },
    {
      name: 'reportingStatusName',
      title: 'Estado de Reportería',
      width: 160,
      class: 'justify-content-center',
      custom: {
        name: 'reportingStatus',
        values: [
          { value: 1, class: 'badge-success' },
          { value: 2, class: 'badge-danger' },
        ],
        type: DatatableColumnType.badge
      }
    },
  ]

  public actions: DatatableAction[] = [
    { name: 'edit-category', icon: 'edit', width: 40, title: 'Editar' }
  ]

  ngOnInit(): void {
    this._loadingService.show();
    this._commonsService.findMeasurementUnit({ companyId: 1 }).subscribe(data => {
      this.measurementUnitDtos = data;
      this._loadingService.hide();
      console.log(this.measurementUnitDtos);
    });
  }

  create(): void {
    const modal = this._modalService.open(MeasurementUnitComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<MeasurementUnitDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.measurementUnitDtos.push(modalResultModel.data);
        this.measurementUnitDtos = [...this.measurementUnitDtos.sort((a, b) => (a.name.localeCompare(b.name)))]
      }
    });
  }

  edit(item: number, measurementUnitDto: MeasurementUnitDto): void {
    const modal = this._modalService.open(MeasurementUnitComponent, { size: 'sm' });
    modal.componentInstance.measurementUnitDto = { ...measurementUnitDto }
    modal.result.then((modalResultModel: ModalResultModel<MeasurementUnitDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.measurementUnitDtos[item] = modalResultModel.data;
        this.measurementUnitDtos = [...this.measurementUnitDtos.sort((a, b) => (a.name.localeCompare(b.name)))]
      }
    });
  }

  action({ name, index, row }) {
    this.edit(index, row);
  }
}
