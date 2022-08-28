import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementUnitDto } from 'app/core/dtos/commons/measurement-unit.dto';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.scss']
})
export class MeasurementUnitComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal,
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService,
    private _loadingService: LoadingService
  ) {
    this.measurementUnitDto.id = 0;
    this.measurementUnitDto.status = -1;
    this.measurementUnitDto.reportingStatus = -1;
  }

  public title: string = "";
  public measurementUnitDto: MeasurementUnitDto = new MeasurementUnitDto();
  public statusModels: SelectItemModel[] = [];
  public reportingStatusModels: SelectItemModel[] = [];

  ngOnInit(): void {
    this.title = ((this.measurementUnitDto.id ?? 0) == 0 ? "Crear" : "Editar") + " Unidad de Medida";
    this.statusModels = this._globalService.getStatusModels();
    this.reportingStatusModels = this._globalService.getReportingStatusModels();
  }

  async save(): Promise<void> {
    if (this.validate()) {
      let question: string = "¿Está seguro " + ((this.measurementUnitDto.id ?? 0) == 0 ? "crear" : "editar") + "  unidad de medida?";
      const result: any = await this._sweetAlertService.confirm({ content: question });
      if (!result.value) return;

      this._loadingService.show();
      this.measurementUnitDto.companyId = 1; // TODO:
      if ((this.measurementUnitDto.id ?? 0) == 0) {
        this._commonsService.createMeasurementUnit(this.measurementUnitDto).subscribe(data => {
          this.measurementUnitDto = data;
          this._loadingService.hide();
          this._toastrService.success("Se creó unidad de medida exitosamente");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.measurementUnitDto));
        });
      }
      else {
        this._commonsService.editMeasurementUnit(this.measurementUnitDto).subscribe(data => {
          this.measurementUnitDto = data;
          this._loadingService.hide();
          this._toastrService.success("Se editó unidad de medida exitosamente");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.measurementUnitDto));
        });
      }
    }
  }

  validate(): boolean {
    if ((this.measurementUnitDto.name ?? "") == "") {
      this._toastrService.warning("Asegúrese de ingresar 'Nombre'");
      return;
    }
    else if ((this.measurementUnitDto.symbol ?? "") == "") {
      this._toastrService.warning("Asegúrese de ingresar 'Símbolo'");
      return;
    }
    else if ((this.measurementUnitDto.isoCode ?? "") == "") {
      this._toastrService.warning("Asegúrese de ingresar 'Código Iso'");
      return;
    }
    else if ((this.measurementUnitDto.status) < 0) {
      this._toastrService.warning("Asegúrese de seleccionar 'Estado'");
      return;
    }
    else if ((this.measurementUnitDto.reportingStatus) < 0) {
      this._toastrService.warning("Asegúrese de seleccionar 'Estado de Reportería'");
      return;
    }
    return true;
  }

  close(): void {
    this._activeModalService.close(this._globalService.getCloseModalResult());
  }

}
