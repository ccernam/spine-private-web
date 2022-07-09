import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  public title: string = "";
  public warehouseDto: WarehouseDto = new WarehouseDto();
  public branchDtos: BranchDto[] = [];
  public statusModels: SelectItemModel[] = [];
  public reportingStatusModels: SelectItemModel[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal
  ) {
    this.warehouseDto.id = 0;
    this.warehouseDto.branchId = -1;
    this.warehouseDto.status = -1;
    this.warehouseDto.reportingStatus = -1;
  }

  ngOnInit(): void {
    this.title = ((this.warehouseDto.id ?? 0) == 0 ? "Crear" : "Editar") + " Almacén";
    this.statusModels = this._globalService.getStatusModels();
    this.reportingStatusModels = this._globalService.getReportingStatusModels();
    this._commonsService.findBranch({ companyId: 1, status: 1 }).subscribe(data => {
      this.branchDtos = data;
    });
  }

  save(): void {
    if (this.validate()) {
      this.warehouseDto.companyId = 1; // TODO:
      if ((this.warehouseDto.id ?? 0) == 0) {
        this._commonsService.createWarehouse(this.warehouseDto).subscribe(data => {
          this.warehouseDto = data;
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.warehouseDto));
        });
      }
      else {
        this._commonsService.editWarehouse(this.warehouseDto).subscribe(data => {
          this.warehouseDto = data;
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.warehouseDto));
        });
      }
    }
  }

  validate(): boolean {
    return true;
  }

  close(): void {
    this._activeModalService.close(this._globalService.getCloseModalResult());
  }
}
