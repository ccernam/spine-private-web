import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { LogisticsService } from 'app/core/services/logistics.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
  selector: 'app-product-movement-form',
  templateUrl: './product-movement-form.component.html',
  styleUrls: ['./product-movement-form.component.scss']
})
export class ProductMovementFormComponent implements OnInit {
  public branches : BranchDto[] = [];
  public warehouses : WarehouseDto[] = [];
  public types: CatalogDetailDto[] = [];
  public reasons : CatalogDetailDto[] = [];
  public products :  ProductDto[] = [];

  public inboundReasons : CatalogDetailDto[] = [];
  public outboundReasons : CatalogDetailDto[] = [];
  
  constructor(
    private _activeModal: NgbActiveModal,
    private _logisticsService: LogisticsService,
    private _toastrService: CustomToastrService
  ) { }

  title: string = "Crear nuevo movimiento de almacén"
  ngOnInit(): void {

  }

  saveActiveProductMovent():void {
    
  }

  saveTempProductMovent():void {
    
  }

  close(): void {
    this._activeModal.close({ success: false });
  }

  movementTypeChanged(selected :CatalogDetailDto){
    if (selected == null)
    {
      this.reasons = [];
    }
    else
    {
      if (selected.numericValue == 1)
      {
        this.reasons = this.inboundReasons;
      }
      else if (selected.numericValue == 2)
      {
        this.reasons = this.outboundReasons;
      }
      else
      {
        this.reasons = [];
      }
    }
  }

  addDetail(){
    
  }
}
