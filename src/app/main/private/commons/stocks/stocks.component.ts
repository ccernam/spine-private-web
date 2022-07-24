import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { StockDto } from 'app/core/dtos/commons/stock.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  public productDto: ProductDto = new ProductDto();
  public stockDtos: StockDto[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this._loadingService.show();
    this._commonsService.getStocks(this.productDto.id).subscribe(data => {
      this.stockDtos = data;
      this._loadingService.hide();
    });
  }

  close(): void {
    this._activeModalService.close(this._globalService.getSuccessModalResult(true));
  }
}
