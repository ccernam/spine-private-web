import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyDto } from 'app/core/dtos/commons/currency.dto';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal,
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService,
    private _loadingService: LoadingService
  ) {
    this.currencyDto.id = 0;
    this.currencyDto.status = -1;
    this.currencyDto.reportingStatus = -1;
  }

  public title: string = "";
  public currencyDto: CurrencyDto = new CurrencyDto();
  public statusModels: SelectItemModel[] = [];
  public reportingStatusModels: SelectItemModel[] = [];

  ngOnInit(): void {
    this.title = ((this.currencyDto.id ?? 0) == 0 ? "Crear" : "Editar") + " Moneda";
    this.statusModels = this._globalService.getStatusModels();
    this.reportingStatusModels = this._globalService.getReportingStatusModels();
  }

  async save(): Promise<void> {
    if (this.validate()) {
      let question: string = "¿Está seguro " + ((this.currencyDto.id ?? 0) == 0 ? "crear" : "editar") + " moneda?";
      const result: any = await this._sweetAlertService.confirm({ content: question });
      if (!result.value) return;

      this._loadingService.show();
      this.currencyDto.companyId = 1; // TODO:
      if ((this.currencyDto.id ?? 0) == 0) {
        this._commonsService.createCurrency(this.currencyDto).subscribe(data => {
          this.currencyDto = data;
          this._loadingService.hide();
          this._toastrService.success("Se creó moneda exitosamente");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.currencyDto));
        });
      }
      else {
        this._commonsService.editCurrency(this.currencyDto).subscribe(data => {
          this.currencyDto = data;
          this._loadingService.hide();
          this._toastrService.success("Se editó moneda exitosamente");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.currencyDto));
        });
      }
    }
  }

  validate(): boolean {
    if ((this.currencyDto.name ?? "") == "") {
      this._toastrService.warning("Asegúrese de ingresar 'Nombre'");
      return;
    }
    else if ((this.currencyDto.symbol ?? "") == "") {
      this._toastrService.warning("Asegúrese de ingresar 'Símbolo'");
      return;
    }
    else if ((this.currencyDto.isoCode ?? "") == "") {
      this._toastrService.warning("Asegúrese de ingresar 'Código Iso'");
      return;
    }
    else if ((this.currencyDto.status) < 0) {
      this._toastrService.warning("Asegúrese de seleccionar 'Estado'");
      return;
    }
    else if ((this.currencyDto.reportingStatus) < 0) {
      this._toastrService.warning("Asegúrese de seleccionar 'Estado de Reportería'");
      return;
    }
    return true;
  }

  close(): void {
    this._activeModalService.close(this._globalService.getCloseModalResult());
  }

}
