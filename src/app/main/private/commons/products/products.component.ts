import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { forkJoin, Observable } from 'rxjs';
import { PricesComponent } from '../prices/prices.component';
import { ProductComponent } from '../product/product.component';
import { StocksComponent } from '../stocks/stocks.component';

@Component({
   selector: 'app-products',
   templateUrl: './products.component.html',
   styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

   constructor(
      private _commonsService: CommonsService,
      private _globalService: GlobalService,
      private _modalService: NgbModal,
      private _loadingService: LoadingService
   ) { }

   public parameters = { companyId: 1, code: "", name: "", categoryId: -1 };
   public productDtos: ProductDto[] = [];
   public categoryDtos: CategoryDto[] = [];

   ngOnInit(): void {
      this._loadingService.show();
      this.getInitialData().subscribe(data => {
         this._loadingService.hide();
         this.categoryDtos = [{ id: -1, name: '- Todos -' }, ...data[0]];
      });
   }

   getInitialData(): Observable<any> {
      return forkJoin([
         this._commonsService.findCategory({ companyId: 1 })
      ]);
   }

   find(): void {
      this._loadingService.show();
      this._commonsService.findProduct(this.parameters).subscribe(data => {
         this.productDtos = data;
         this._loadingService.hide();
      });
   }

   create(): void {
      const modal = this._modalService.open(ProductComponent, { size: 'sm' });
      modal.result.then((modalResultModel: ModalResultModel<ProductDto>) => {
         if (modalResultModel != null && modalResultModel.success == true) {
            this.productDtos.push(modalResultModel.data);
            this.productDtos = this.productDtos.sort((a, b) => (a.name.localeCompare(b.name) || a.name.localeCompare(b.name)))
         }
      });
   }

   edit(item: number, productDto: ProductDto): void {
      const modal = this._modalService.open(ProductComponent, { size: 'sm' });
      modal.componentInstance.productDto = { ...productDto };
      modal.result.then((modalResultModel: ModalResultModel<ProductDto>) => {
         if (modalResultModel != null && modalResultModel.success == true) {
            this.productDtos.push(modalResultModel.data);
            this.productDtos = this.productDtos.sort((a, b) => (a.name.localeCompare(b.name) || a.name.localeCompare(b.name)))
         }
      });
   }

   findStock(item: number, productDto: ProductDto): void {
      const modal = this._modalService.open(StocksComponent, { size: 'lg' });
      modal.componentInstance.productDto = { ...productDto }
      /*modal.result.then((modalResultModel: ModalResultModel<boolean>) => {

      });*/
   }

   showPrices(productDto: ProductDto): void {
      const modal = this._modalService.open(PricesComponent, { size: 'lg' });
      modal.componentInstance.productDto = { ...productDto }
   }
}