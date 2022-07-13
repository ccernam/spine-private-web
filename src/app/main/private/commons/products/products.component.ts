import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { forkJoin, Observable } from 'rxjs';
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
      private _modalService: NgbModal
   ) { }

   public productDtos: ProductDto[] = [];
   public categoryDtos: CategoryDto[] = [];

   ngOnInit(): void {
      this.getInitialData().subscribe(data => {
         this.categoryDtos = data[0];
         this.productDtos = data[1];
      });
   }

   getInitialData(): Observable<any> {
      return forkJoin([
         this._commonsService.findCategory({ companyId: 1, reportingStatus: 1 }),
         this._commonsService.findProduct({ companyId: 1 })
      ]);
   }

   create(): void {
      alert("create")
   }

   edit(item: number, productDto: ProductDto): void {
      alert("edit");
   }

   findStock(item: number, productDto: ProductDto): void {
      const modal = this._modalService.open(StocksComponent, { size: 'lg' });
      modal.componentInstance.productDto = { ...productDto }
      /*modal.result.then((modalResultModel: ModalResultModel<boolean>) => {
         
      });*/
   }
}