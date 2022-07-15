import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyDto } from 'app/core/dtos/commons/currency.dto';
import { PriceDto } from 'app/core/dtos/commons/price.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  public productDto: ProductDto = new ProductDto();
  public currencyDtos: CurrencyDto[] = [];
  public priceDtos: PriceDto[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this._commonsService.findCurrency({ companyId: 1 }).subscribe(data => {
      this.currencyDtos = data;
    });
  }

  changeCurrency(currencyId: number): void {
    this.priceDtos = [];
    if (currencyId > 0) {
      this._commonsService.findPrice(this.productDto.id, currencyId).subscribe(data => {
        this.priceDtos = data;
      });
    }
  }

  save(): void {
    console.log(this.priceDtos);
  }

  close(): void {
    this._activeModalService.close(this._globalService.getSuccessModalResult(true));
  }
}