import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { ProductMovementDetailDto } from 'app/core/dtos/logistics/product-movement-detail.dto';
import { ProductMovementDto } from 'app/core/dtos/logistics/product-movement.dto';
import { LogisticsService } from 'app/core/services/logistics.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { empty } from 'rxjs';

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
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService
  ) { }

  title: string = "Crear nuevo movimiento de almacén"

  ngOnInit(): void
  {
    this.productMovementDetailDto.status = 1;
    if (this.formType == 2 || this.formType == 3)
    {
      this.loadMovementValues();
    }
  }

  async saveActiveProductMovent()
  {   
    const result: any = await this._sweetAlertService.confirm({
      text: "¿Está seguro que desea guardar éste movimiento de almacén?"
    });

    if(!result.value) return;

    this.saveProductMovement(1);    
  }

  saveTempProductMovent()
  {
    this.saveProductMovement(3);
  }

  saveProductMovement(status: number):void
  {
    if(this.isInvalidHeader())
    {
      return;
    }   

    this.productMovementDto.status = status;
    this.productMovementDto.productMovementDetails = [... this.productMovementDetails];
    this.productMovementDto.companyId = 1;
    this.productMovementDto.branchId = 1;
    if(this.formType == 1)
    {      
      this._logisticsService.createProductMovement(this.productMovementDto).subscribe(data => {
        this._toastrService.success("Agregado correctamente");
        this._activeModal.close({ success: true });
      });
    }
    else if (this.formType == 2)
    {
      this._logisticsService.editProductMovement(this.productMovementDto).subscribe(data => {
        this._toastrService.success("Editado correctamente");
        this._activeModal.close({ success: true });
      });      
    }
  }

  close(): void
  {
    this._activeModal.close({ success: false });
  }

  movementTypeChanged(selected :CatalogDetailDto)
  {
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

  actionEvent({ name, index, row })
  {
    
    if (name == 'delete-product-movement-detail')
    {
      this.deleteDetail(index, row);
    }
  }

  deleteDetail(item: number, productMovementDetail: ProductMovementDetailDto)
  {    
    this.deleteLocalProductMovementDetail(item, productMovementDetail);     
  }

  addDetail()
  {
    if (this.isInvalidDetail()){
      return;
    }
    this.productMovementDetailDto.id =0;
    this.productMovementDetailDto.status = 1;
    this.productMovementDetailDto.statusName = "Activado";
    this.productMovementDetailDto.productName = this.products.find(x => x.id == this.productMovementDetailDto.productId).name;
    let newDetail : ProductMovementDetailDto = { ... this.productMovementDetailDto}
    this.productMovementDetails = [ ...this.productMovementDetails, newDetail  ]
    this.clearDetailValues();  
  }  

  deleteLocalProductMovementDetail(index: number, productMovementDetail: ProductMovementDetailDto)
  {
    let localProductMovementDetails : ProductMovementDetailDto[] = [ ...this.productMovementDetails ];
    localProductMovementDetails.splice(index, 1);
    this.productMovementDetails = [ ...localProductMovementDetails  ];
  }

  clearDetailValues()
  {
    this.productMovementDetailDto = new ProductMovementDetailDto();
  }

  loadMovementValues()
  {
    //header values
    let type = new CatalogDetailDto()
    type.numericValue = this.productMovementDto.type;
    this.movementTypeChanged( type );

    //detail list
    if(this.formType == 3)
    {
      this.actions = [];
    }

    this._logisticsService.findProductMovementDetail({ productMovementId: this.productMovementDto.id}).subscribe(data => {
      this.productMovementDetails = [ ...data  ];
    });    
  }

  updateIssueDate(event : any)
  {
    this.productMovementDto.issueDate = new Date(event);
  }

  //Validations
  isInvalidDetail(): boolean
  {
    let validationMessage:string = "";
    if (this.productMovementDetailDto.productId == null || this.productMovementDetailDto.productId == undefined)
    {
      validationMessage = validationMessage.concat("Debe seleccionar un producto . \r\n");
    }

    if (this.productMovementDetailDto.quantity == null || this.productMovementDetailDto.quantity == undefined)
    {
      validationMessage = validationMessage.concat("Debe escribir la cantidad .\r\n");
    }

    if (this.productMovementDetailDto.billedAmount == null || this.productMovementDetailDto.productId == undefined)
    {
      validationMessage = validationMessage.concat("Debe escribir el monto pagado .\r\n");
    }
    
    if (this.productMovementDetailDto.comments == null || this.productMovementDetailDto.comments == undefined || this.productMovementDetailDto.comments == "")
    {
      validationMessage = validationMessage.concat("Debe escribir un comentario para el detalle.\r\n");
    }

    if(validationMessage.length > 0)
    {
      this._toastrService.warning(validationMessage);
      return true;
    }
    return false;    
  }

  isInvalidHeader(): boolean
  {
    let validationMessage:string = "";

    if (this.productMovementDto.branchId == null || this.productMovementDto.branchId == undefined)
    {
      validationMessage = validationMessage.concat("Debe seleccionar una suscursal . \r\n");
    }

    if (this.productMovementDto.warehouseId == null || this.productMovementDto.warehouseId == undefined)
    {
      validationMessage = validationMessage.concat("Debe seleccionar un almacén . \r\n");
    }

    if (this.productMovementDto.type == null || this.productMovementDto.type == undefined)
    {
      validationMessage = validationMessage.concat("Debe seleccionar un tipo de movimiento . \r\n");
    }

    if (this.productMovementDto.reason == null || this.productMovementDto.reason == undefined)
    {
      validationMessage = validationMessage.concat("Debe seleccionar un motivo de movimiento . \r\n");
    }

    if (this.productMovementDto.comments == null || this.productMovementDto.comments == undefined || this.productMovementDto.comments == "")
    {
      validationMessage = validationMessage.concat("Debe escribir un comentario . \r\n");
    }

    if (this.productMovementDto.issueDate == null || this.productMovementDto.issueDate == undefined || isNaN(this.productMovementDto.issueDate.getTime()) )
    {
      validationMessage = validationMessage.concat("Debe seleccionar una fecha de movimiento . \r\n");
    }

    if (this.productMovementDto.productMovementDetails == null || this.productMovementDto.productMovementDetails == undefined || this.productMovementDto.productMovementDetails.length == 0)
    {
      validationMessage = validationMessage.concat("Debe agregar al menos un detalle en el movimiento . \r\n");
    }

    if(validationMessage.length > 0)
    {
      this._toastrService.warning(validationMessage);
      return true;
    }
    return false;
  }
}
