import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { WarehouseComponent } from '../warehouse/warehouse.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _modalService: NgbModal,
    private _loadingService: LoadingService
  ) { }

  public warehouseDtos: WarehouseDto[] = [];

  public columns: DatatableColumn[] = [
    {
      name: 'branchName',
      title: 'Sucursal',
      width: 1000
    },
    {
      name: 'name',
      title: 'Nombre',
      width: 1000
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
    this._commonsService.findWarehouse({ companyId: 1 }).subscribe(data => {
      this.warehouseDtos = data;
      this._loadingService.hide();
    });
  }

  create(): void {
    const modal = this._modalService.open(WarehouseComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<WarehouseDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.warehouseDtos.push(modalResultModel.data);
        this.warehouseDtos = [...this.warehouseDtos.sort((a, b) => (a.branchName.localeCompare(b.branchName) || a.name.localeCompare(b.name)))]
      }
    });
  }

  edit(item: number, warehouseDto: WarehouseDto): void {
    const modal = this._modalService.open(WarehouseComponent, { size: 'sm' });
    modal.componentInstance.warehouseDto = { ...warehouseDto }
    modal.result.then((modalResultModel: ModalResultModel<WarehouseDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.warehouseDtos[item] = modalResultModel.data;
        this.warehouseDtos = [...this.warehouseDtos.sort((a, b) => (a.branchName.localeCompare(b.branchName) || a.name.localeCompare(b.name)))]
      }
    });
  }

  action({ name, index, row }) {
    this.edit(index, row);
  }
}