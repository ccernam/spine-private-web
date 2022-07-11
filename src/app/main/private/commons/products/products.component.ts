import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';

@Component({
   selector: 'app-products',
   templateUrl: './products.component.html',
   styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

   constructor(
      private _commonsService: CommonsService,
      private _globalService: GlobalService
   ) { }

   public productDtos: ProductDto[] = [];

   ngOnInit(): void {
      this._commonsService.findProduct().subscribe(data => {
         this.productDtos = data;
      });
   }

   create(): void {
      alert("create")
   }

   edit(item: number, productDto: ProductDto): void {
      alert("edit");
   }
}