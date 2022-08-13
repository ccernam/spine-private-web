import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { ProductMovementDetailDto } from 'app/core/dtos/logistics/product-movement-detail.dto';
import { ProductMovementDto } from 'app/core/dtos/logistics/product-movement.dto';
import { LogisticsService } from 'app/core/services/logistics.service';
import { CustomToastrService } from 'app/core/services/toastr.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';

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

  public productMovementDetails: ProductMovementDetailDto[] = [];

  public productMovementDto: ProductMovementDto = new ProductMovementDto();
  public productMovementDetailDto: ProductMovementDetailDto = new ProductMovementDetailDto();

  public formType: number = 1;

  public columns: DatatableColumn[] = [
    {
      name: 'productName',
      title: 'Producto',
      width : 50
    },
    {
      name: 'quantity',
      title: 'Cantidad',
      width : 50
    },
    {
      name: 'billedAmount',
      title: 'Monto Facturado',
      width : 50
    },
    {
      name: 'comments',
      title: 'Comentarios',
      width : 100
    },
    {
      name: 'statusName',
      title: 'Estado',
      width: 50,
      class: 'justify-content-center',
      custom: {
         name: 'status',
         values: [
            { value: 0, class: 'badge-danger' },
            { value: 1, class: 'badge-success' },
         ],
         type: DatatableColumnType.badge
      }
   }
  ]

  public actions: DatatableAction[] = [
    { name: 'delete-product-movement-detail', title: 'Eliminar', icon: 'delete', width: 50 },
  ]

  constructor(
    private _activeModal: NgbActiveModal,
    private _logisticsService: LogisticsService,
    private _toastrService: CustomToastrService
  ) { }

  title: string = "Crear nuevo movimiento de almacén"
  ngOnInit(): void {
    this.productMovementDetailDto.status = 1;
  }

  saveActiveProductMovent():void {    
    this.saveProductMovement(1);    
  }

  saveTempProductMovent():void {
    this.saveProductMovement(3);
  }

  saveProductMovement(status: number):void {
    this.productMovementDto.status = status;
    this.productMovementDto.detail = [... this.productMovementDetails];
    if(this.formType == 1)
    {
      this._logisticsService.createProductMovement(this.productMovementDto).subscribe(data => {
        this._toastrService.success("Agregado correctamente");
      });
    }
    else if (this.formType == 2)
    {
      this._logisticsService.createProductMovement(this.productMovementDto).subscribe(data => {
        this._toastrService.success("Editado correctamente");
      });      
    }
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

  actionEvent({ name, index, row }) {
    if (name == 'delete-product-movement-detail')
    {
      this.deleteDetail(index, row);
    }
  }

  deleteDetail(item: number, productMovementDetail: ProductMovementDetailDto){
    if (productMovementDetail.id == 0)
    {
      this.deleteLocalProductMovementDetail(item, productMovementDetail);
      // let localProductMovementDetails : ProductMovementDetailDto[] = [ ...this.productMovementDetails ];
      // localProductMovementDetails.splice(item, 1);
      // this.productMovementDetails = [ ...localProductMovementDetails  ];
    }    
  }

  addDetail(){
    this.productMovementDetailDto.id =0;
    this.productMovementDetailDto.statusName = "Activado";
    this.productMovementDetailDto.productName = this.products.find(x => x.id == this.productMovementDetailDto.productId).name;
    let newDetail : ProductMovementDetailDto = { ... this.productMovementDetailDto}
    this.productMovementDetails = [ ...this.productMovementDetails, newDetail  ]
    //this.productMovementDto.detail = [... this.productMovementDetails];    
  }

  deleteLocalProductMovementDetail(index: number, productMovementDetail: ProductMovementDetailDto)
  {
    let localProductMovementDetails : ProductMovementDetailDto[] = [ ...this.productMovementDetails ];
    localProductMovementDetails.splice(index, 1);
    this.productMovementDetails = [ ...localProductMovementDetails  ];
  }
}
