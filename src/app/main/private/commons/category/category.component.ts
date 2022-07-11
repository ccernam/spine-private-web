import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public title: string = "";
  public categoryDto: CategoryDto = new CategoryDto();
  public statusModels: SelectItemModel[] = [];
  public reportingStatusModels: SelectItemModel[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _toastrService: ToastrService,
    private _activeModalService: NgbActiveModal
  ) {
    this.categoryDto.id = 0;
    this.categoryDto.status = -1;
    this.categoryDto.reportingStatus = -1;
  }

  ngOnInit(): void {
    this.title = ((this.categoryDto.id ?? 0) == 0 ? "Crear" : "Editar") + " Sucursal";
    this.statusModels = this._globalService.getStatusModels();
    this.reportingStatusModels = this._globalService.getReportingStatusModels();
  }

  save(): void {
    if (this.validate()) {
      this.categoryDto.companyId = 1; // TODO:
      if ((this.categoryDto.id ?? 0) == 0) {
        this._commonsService.createCategory(this.categoryDto).subscribe(data => {
          this.categoryDto = data;
          this._toastrService.success("Se creó categoría exitosamente", "Ok");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.categoryDto));
        });
      }
      else {
        this._commonsService.editCategory(this.categoryDto).subscribe(data => {
          this.categoryDto = data;
          this._toastrService.success("Se editó categoría exitosamente", "Ok");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.categoryDto));
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
