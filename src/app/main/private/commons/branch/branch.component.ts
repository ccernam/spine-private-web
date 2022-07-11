import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  public title: string = "";
  public branchDto: BranchDto = new BranchDto();
  public statusModels: SelectItemModel[] = [];
  public reportingStatusModels: SelectItemModel[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _toastrService: ToastrService,
    private _activeModalService: NgbActiveModal

  ) {
    this.branchDto.id = 0;
    this.branchDto.status = -1;
    this.branchDto.reportingStatus = -1;
  }

  ngOnInit(): void {
    this.title = ((this.branchDto.id ?? 0) == 0 ? "Crear" : "Editar") + " Sucursal";
    this.statusModels = this._globalService.getStatusModels();
    this.reportingStatusModels = this._globalService.getReportingStatusModels();
  }

  save(): void {
    if (this.validate()) {
      this.branchDto.companyId = 1; // TODO:
      if ((this.branchDto.id ?? 0) == 0) {
        this._commonsService.createBranch(this.branchDto).subscribe(data => {
          this.branchDto = data;
          this._toastrService.success("Se creó sucursal exitosamente", "Ok");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.branchDto));
        });
      }
      else {
        this._commonsService.editBranch(this.branchDto).subscribe(data => {
          this.branchDto = data;
          this._toastrService.success("Se editó sucursal exitosamente", "Ok");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.branchDto));
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
