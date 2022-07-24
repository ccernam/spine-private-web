import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyDto } from 'app/core/dtos/commons/currency.dto';
import { EditPricesDto } from 'app/core/dtos/commons/edit-prices.dto';
import { PriceDto } from 'app/core/dtos/commons/price.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  public editPricesDto: EditPricesDto = new EditPricesDto();
  public productDto: ProductDto = new ProductDto();
  public currencyDtos: CurrencyDto[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal,
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this._loadingService.show();
    this.editPricesDto.productId = this.productDto.id;
    this.editPricesDto.currencyId = -1;
    this.editPricesDto.priceDtos = [];
    this._commonsService.findCurrency({ companyId: 1 }).subscribe(data => {
      this.currencyDtos = data;
      this._loadingService.hide();
    });
  }

  changeCurrency(currencyId: number): void {
    this.editPricesDto.priceDtos = [];
    if (currencyId > 0) {
      this._loadingService.show();
      this.editPricesDto.currencyId = currencyId;
      this._commonsService.getPrices(this.productDto.id, currencyId).subscribe(data => {
        this.editPricesDto.priceDtos = data;
        this._loadingService.hide();
      });
    }
  }

  async save(): Promise<void> {
    if (this.editPricesDto.productId <= 0) {
      this._toastrService.warning("Asegúrese de seleccionar producto.");
      return;
    }
    else if (this.editPricesDto.currencyId <= 0) {
      this._toastrService.warning("Asegúrese de seleccionar moneda.");
      return;
    }
    else if (this.editPricesDto.priceDtos.length == 0) {
      this._toastrService.warning("La lista de precios se encuentra vacía.");
      return;
    }

    const result: any = await this._sweetAlertService.confirm({ text: "¿Está seguro editar precios?" });
    if (!result.value) return;

    this._loadingService.show();
    this._commonsService.editPrices(this.editPricesDto).subscribe(data => {
      this._toastrService.success("¡Se editaron precios exitosamente!");
      this._loadingService.hide();
      this.close();
    });
  }

  close(): void {
    this._activeModalService.close(this._globalService.getSuccessModalResult(true));
  }
}