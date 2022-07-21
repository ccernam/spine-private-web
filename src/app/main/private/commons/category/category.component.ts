import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

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
    private _activeModalService: NgbActiveModal,
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService,
    private _loadingService: LoadingService
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

  async save(): Promise<void> {
    if (this.validate()) {
      let question: string = "¿Está seguro " + ((this.categoryDto.id ?? 0) == 0 ? "crear" : "editar") + " categoría?";
      const result: any = await this._sweetAlertService.confirm({ text: question });
      if (!result.value) return;

      this._loadingService.show();
      this.categoryDto.companyId = 1; // TODO:
      if ((this.categoryDto.id ?? 0) == 0) {
        this._commonsService.createCategory(this.categoryDto).subscribe(data => {
          this.categoryDto = data;
          this._loadingService.hide();
          this._toastrService.success("Se creó categoría exitosamente");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.categoryDto));
        });
      }
      else {
        this._commonsService.editCategory(this.categoryDto).subscribe(data => {
          this.categoryDto = data;
          this._loadingService.hide();
          this._toastrService.success("Se editó categoría exitosamente");
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
