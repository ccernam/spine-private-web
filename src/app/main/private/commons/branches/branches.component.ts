import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { BranchComponent } from '../branch/branch.component';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  public branchDtos: BranchDto[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _modalService: NgbModal,
    private _loadingService: LoadingService
  ) { }

  public columns: DatatableColumn[] = [
    {
      name: 'name',
      title: 'Nombre',
      width: 1000
    },
    {
      name: 'address',
      title: 'Dirección',
      width: 1000
    },
    {
      name: 'statusName',
      title: 'Estado',
      width: 160,
      class: 'justify-content-center',
      custom: {
        name: 'status',
        values: [
          { value: 1, class: 'badge-success' },
          { value: 2, class: 'badge-danger' },
        ],
        type: DatatableColumnType.badge
      }
    },
    {
      name: 'reportingStatusName',
      title: 'Estado de Reportería',
      width: 160,
      class: 'justify-content-center',
      custom: {
        name: 'reportingStatus',
        values: [
          { value: 1, class: 'badge-success' },
          { value: 2, class: 'badge-danger' },
        ],
        type: DatatableColumnType.badge
      }
    },
  ]

  public actions: DatatableAction[] = [
    { name: 'edit-category', icon: 'edit', width: 40, title: 'Editar' }
  ]

  ngOnInit(): void {
    this._loadingService.show();
    this._commonsService.findBranch({ companyId: 1 }).subscribe(data => {
      this.branchDtos = data;
      this._loadingService.hide();
    });
  }

  create(): void {
    const modal = this._modalService.open(BranchComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<BranchDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.branchDtos.push(modalResultModel.data);
        this.branchDtos = [...this.branchDtos.sort((a, b) => (a.name.localeCompare(b.name)))]
      }
    });
  }

  edit(item: number, branchDto: BranchDto): void {
    const modal = this._modalService.open(BranchComponent, { size: 'sm' });
    modal.componentInstance.branchDto = { ...branchDto }
    modal.result.then((modalResultModel: ModalResultModel<BranchDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.branchDtos[item] = modalResultModel.data;
        this.branchDtos = [...this.branchDtos.sort((a, b) => (a.name.localeCompare(b.name)))]
      }
    });
  }

  action({ name, index, row }) {
    this.edit(index, row);
  }

}
