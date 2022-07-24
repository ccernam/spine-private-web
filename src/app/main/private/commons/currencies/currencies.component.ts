import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyDto } from 'app/core/dtos/commons/currency.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { CurrencyComponent } from '../currency/currency.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _loadingService: LoadingService,
    private _globalService: GlobalService,
    private _modalService: NgbModal
  ) { }

  public currencyDtos: CurrencyDto[] = [];

  ngOnInit(): void {
    this._loadingService.show();
    this._commonsService.findCurrency({ companyId: 1 }).subscribe(data => {
      this.currencyDtos = data;
      this._loadingService.hide();
    });
  }

  create(): void {
    const modal = this._modalService.open(CurrencyComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<CurrencyDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.currencyDtos.push(modalResultModel.data);
        this.currencyDtos = this.currencyDtos.sort((a, b) => (a.name.localeCompare(b.name)))
      }
    });
  }

  edit(item: number, currencyDto: CurrencyDto): void {
    const modal = this._modalService.open(CurrencyComponent, { size: 'sm' });
    modal.componentInstance.currencyDto = { ...currencyDto }
    modal.result.then((modalResultModel: ModalResultModel<CurrencyDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.currencyDtos[item] = modalResultModel.data;
        this.currencyDtos = this.currencyDtos.sort((a, b) => (a.name.localeCompare(b.name)))
      }
    });
  }
}
