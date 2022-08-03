import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductMovementDto } from 'app/core/dtos/logistics/product-movement.dto';
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
    private _configurationService: ConfigurationService,
    private modal: NgbModal,
    private _toastrService: CustomToastrService,
    private _sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this._loadingService.show();
    this._logisticsService.findProductMovementHeader().subscribe(data => {
      this._loadingService.hide();
      this.productMovements = data.map((item: any, index: number) => ({ ...item, number: (index + 1) }));
    });
    this._loadingService.show();
    this._configurationService.findCatalogMaster(["0701", "0702", "0703", "0704"]).subscribe(data => {
      this._loadingService.hide();
      console.log(data);
    });
  }

  createProductMovement(){
    const modal = this.modal.open(ProductMovementFormComponent, { size: 'lg' });
    modal.result.then((result) => {

    });
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
    console.log(productMovement);
  }

  async rollbackProductMovement(item: number, productMovement: ProductMovementDto) {
    if (productMovement.status != 1)
    {
      this._toastrService.error("Solo se pueden anular los movimientos activos");
    }
    else
    {
      const result: any = await this._sweetAlertService.confirm({
        text: "¿Está seguro que desea anular éste movimiento de almacén?"
      });

      if(!result.value) return;

      
      this._logisticsService.rollbackProductMovement(productMovement.id).subscribe(data => {
        this._toastrService.success("Anulado correctamente");
      });
    }
  }

  viewProductMovement(item: number, productMovement: ProductMovementDto) {
    console.log(productMovement);
  }
}
