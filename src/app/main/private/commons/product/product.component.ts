import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { MeasurementUnitDto } from 'app/core/dtos/commons/measurement-unit.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { SelectItemModel } from 'app/core/models/select-item.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public title: string = "";
  public productDto: ProductDto = new ProductDto();
  public categoryDtos: CategoryDto[] = [];
  public measurementUnitDtos: MeasurementUnitDto[] = [];
  public statusModels: SelectItemModel[] = [];
  public reportingStatusModels: SelectItemModel[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _toastrService: CustomToastrService,
    private _activeModalService: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.statusModels = this._globalService.getStatusModels();
    this.reportingStatusModels = this._globalService.getReportingStatusModels();
    this._commonsService.findCategory({ companyId: 1, status: 1 }).subscribe(data => {
      this.categoryDtos = data;
    });
    this._commonsService.findMeasurementUnit({ companyId: 1, status: 1 }).subscribe(data => {
      this.measurementUnitDtos = data;
    });

    if ((this.productDto.id ?? 0) == 0) {
      this.title = "Crear Producto";
      this.productDto.categoryId = -1;
      this.productDto.measurementUnitId = -1;
      this.productDto.status = -1;
      this.productDto.reportingStatus = -1;
    }
    else {
      this.title = "Editar Producto";


    }



  }

  save(): void {
    if (this.validate()) {
      this.productDto.companyId = 1; // TODO:
      if ((this.productDto.id ?? 0) == 0) {
        this._commonsService.createProduct(this.productDto).subscribe(data => {
          this.productDto = data;
          this._toastrService.success("Se creó producto exitosamente");
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.productDto));
        });
      }
      else {
        this._commonsService.editProduct(this.productDto).subscribe(data => {
          this.productDto = data;
          this._toastrService.success("Se editó producto exitosamente");
          this.productDto.categoryName = this.categoryDtos.find(x => x.id == this.productDto.categoryId).name
          this.productDto.measurementUnitName = this.measurementUnitDtos.find(x => x.id == this.productDto.measurementUnitId).name;
          this._activeModalService.close(this._globalService.getSuccessModalResult(this.productDto));
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
