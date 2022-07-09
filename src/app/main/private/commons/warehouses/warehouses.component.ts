import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
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
    private _modalService: NgbModal
  ) { }

  public warehouseDtos: WarehouseDto[] = [];

  ngOnInit(): void {
    this._commonsService.findWarehouse({ companyId: 1 }).subscribe(data => {
      this.warehouseDtos = data;
    });
  }

  create(): void {
    const modal = this._modalService.open(WarehouseComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<WarehouseDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.warehouseDtos.push(modalResultModel.data);
        this.warehouseDtos = this.warehouseDtos.sort((a, b) => (a.branchName.localeCompare(b.branchName) || a.name.localeCompare(b.name)))
      }
    });
  }

  edit(item: number, warehouseDto: WarehouseDto): void {
    const modal = this._modalService.open(WarehouseComponent, { size: 'sm' });
    modal.componentInstance.warehouseDto = { ...warehouseDto }
    modal.result.then((modalResultModel: ModalResultModel<WarehouseDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.warehouseDtos[item] = modalResultModel.data;
        this.warehouseDtos = this.warehouseDtos.sort((a, b) => (a.branchName.localeCompare(b.branchName) || a.name.localeCompare(b.name)))
      }
    });
  }

}
