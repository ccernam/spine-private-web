import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { ProductDto } from 'app/core/dtos/commons/product.dto';
import { WarehouseDto } from 'app/core/dtos/commons/warehouse.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { CatalogDto } from 'app/core/dtos/configuration/catalog.dto';
import { ProductMovementDto } from 'app/core/dtos/logistics/product-movement.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { ConfigurationService } from 'app/core/services/configuration.service';
import { LoadingService } from 'app/core/services/loading.service';
import { LogisticsService } from 'app/core/services/logistics.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { ProductMovementFormComponent } from '../product-movement-form/product-movement-form.component';
import { ProductMovement } from '../product-movement.module';

@Component({
  selector: 'app-product-movement-list',
  templateUrl: './product-movement-list.component.html',
  styleUrls: ['./product-movement-list.component.scss']
})
export class ProductMovementListComponent implements OnInit {

  public productMovements: ProductMovementDto[] = [];


  public branches : BranchDto[] = [];
  public warehouses : WarehouseDto[] = [];
  public statuses : CatalogDetailDto[] = [];
  public types: CatalogDetailDto[] = [];
  public reasons : CatalogDetailDto[] = [];
  public products :  ProductDto[] = [];
  public parameters :{ companyId?:number, branchId?:number, warehouseId?:number, type?:number, reason?:number, supplierId?:number, status?:number, saleDocumentId?:number, buyDocumentId?:number, issueDate?:string } = {};

  private inboundReasons : CatalogDetailDto[] = [];
  private outboundReasons : CatalogDetailDto[] = [];

  public columns: DatatableColumn[] = [
    {
      name: 'branchName',
      title: 'Sucursal',
      width : 50
    },
    {
      name: 'warehouseName',
      title: 'Almacén',
      width : 50
    },
    {
      name: 'typeName',
      title: 'Tipo',
      width : 50
    },
    {
      name: 'issueDate',
      title: 'Fec.Reg.',
      width : 50
    },
    {
      name: 'reasonName',
      title: 'Motivo',
      width : 50
    },
    {
      name: 'comments',
      title: 'Descripcion',
      width : 50
    },
    {
      name: 'saleDocumentNumber',
      title: 'Doc.Venta',
      width : 50
    },
    {
      name: 'buyDocumentNumber',
      title: 'Doc.Compra',
      width : 50
    },
    {
      name: 'supplierName',
      title: 'Proveedor',
      width : 50
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
             { value: 2, class: 'badge-warning' },
          ],
          type: DatatableColumnType.badge
       }
    }
  ]

  public actions: DatatableAction[] = [
    { name: 'edit-product-movement', title: 'Editar', icon: 'edit', width: 50 },
    { name: 'rollback-product-movement', title: 'Anular', icon: 'delete', width: 50 },
    { name: 'view-product-movement', title: 'Ver', icon: 'search', width: 50 }
  ]

  constructor(
    private _loadingService: LoadingService,
    private _logisticsService: LogisticsService,
    private _commonsService : CommonsService,
    private _configurationService: ConfigurationService,
    private modal: NgbModal,
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this._loadingService.show();

    this._commonsService.findBranch({ companyId: 1, status : 1 }).subscribe(data => {
      this.branches = data;
    });

    this._configurationService.findCatalogMaster(["0701", "0702", "0703", "0704"]).subscribe(data => {
      this.statuses = data.find(x => x.code == "0701").details;
      this.types = data.find(x => x.code == "0702").details;
      this.inboundReasons = data.find(x => x.code == "0703").details;
      this.outboundReasons = data.find(x => x.code == "0704").details;
    });

    this._commonsService.findWarehouse({ status : 1 }).subscribe(data => {
      this.warehouses = data;
    });

    this._commonsService.findProduct({ status : 1 }).subscribe(data => {
      this.products = data;
    });
    this._loadingService.hide();
  }

  actionEvent({ name, index, row }) {
    if (name == 'edit-product-movement')
    {
      this.editProductMovement(index, row);
    }
    else if (name == 'rollback-product-movement')
    {
      this.rollbackProductMovement(index, row);
    }
    else if (name == 'view-product-movement')
    {
      this.viewProductMovement(index, row);
    }
  }

  editEvent({ name, index, row }) {
    console.log("testing edit event working")
  }

  editProductMovement(item: number, productMovement: ProductMovementDto) {
    if (productMovement.status != 3){
      this._toastrService.warning("Solo se pueden editar movimientos de almacén en borrador");
      return;
    }

    this.openDetailModal(2, "Editar movimiento de almacén", productMovement);
  }

  async rollbackProductMovement(item: number, productMovement: ProductMovementDto) {
    if (productMovement.status != 1)
    {
      this._toastrService.error("Solo se pueden anular los movimientos activos");
    }
    else
    {
      const result: any = await this._sweetAlertService.confirm({
         content: "¿Está seguro que desea anular éste movimiento de almacén?"
      });

      if(!result.value) return;


      this._logisticsService.rollbackProductMovement(productMovement.id).subscribe(data => {
        this._toastrService.success("Anulado correctamente");
      });
    }
  }

  viewProductMovement(item: number, productMovement: ProductMovementDto) {
    this.openDetailModal(3, "Movimiento de almacén", productMovement);
  }

  createMovement() {
    this.openDetailModal(1, "Crear movimiento de almacén", null);
  }

  openDetailModal(type:number, title:string, productMovement:ProductMovementDto): void {
    const modal = this.modal.open(ProductMovementFormComponent, { size: 'xl' });
    modal.componentInstance.branches = [ ...this.branches ];
    modal.componentInstance.warehouses = [ ...this.warehouses ];
    modal.componentInstance.types = [ ...this.types ];
    modal.componentInstance.products = [ ...this.products ];

    modal.componentInstance.inboundReasons = [ ...this.inboundReasons ];
    modal.componentInstance.outboundReasons = [ ...this.outboundReasons ];

    modal.componentInstance.title = title
    modal.componentInstance.formType = type;

    if (type == 2 || type == 3)
    {
      modal.componentInstance.productMovementDto = { ...productMovement };
    }

    modal.result.then((result) => {
      if ((type == 1 || type == 2) && result.success)
      {
        this.find();
      }
    });
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

  find()
  {
    this._logisticsService.findProductMovementHeader({ companyId :1, branchId:1, warehouseId:this.parameters.warehouseId, type:this.parameters.type, reason: this.parameters.reason, supplierId: this.parameters.supplierId, status:this.parameters.status, issueDate: this.parameters.issueDate }).subscribe(data => {
      this.productMovements = data.map((item: any, index: number) => ({ ...item, number: (index + 1) }));
    });
  }

  updateIssueDate(event : any) {
    if (event!="")
    {
      this.parameters.issueDate = new Date(event).toJSON().toString();
      return;
    }
    this.parameters.issueDate = null;
  }
}
