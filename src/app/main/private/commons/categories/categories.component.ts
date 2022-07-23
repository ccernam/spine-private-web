import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponseDto } from 'app/core/dtos/api-response.dto';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _modalService: NgbModal,
    private _loadingService: LoadingService
  ) { }

  public categoryDtos: CategoryDto[] = [];

  public columns: DatatableColumn[] = [
    { name: 'name', title: 'Nombre' },
    {
      name: 'statusName', title: 'Estado', custom: {
        type: DatatableColumnType.badge
      }
    },
    {
      name: 'reportingStatusName', title: 'Estado de Reportería', custom: {
        type: DatatableColumnType.badge
      }
    },
  ]

  public actions: DatatableAction[] = [
    { name: 'edit-category', icon: 'edit', title: 'Editar' }
  ]

  ngOnInit(): void {
    this._loadingService.show();
    this._commonsService.findCategory({ companyId: 1 }).subscribe(data => {
      this.categoryDtos = data.map((item: any, index: number) => ({ ...item, number: (index + 1) }));
      this._loadingService.hide();
    });
  }

  create(): void {
    const modal = this._modalService.open(CategoryComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<CategoryDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.categoryDtos.push(modalResultModel.data);
        this.categoryDtos = this.categoryDtos.sort((a, b) => (a.name.localeCompare(b.name)))
      }
    });
  }

  edit(item: number, categoryDto: CategoryDto): void {
    const modal = this._modalService.open(CategoryComponent, { size: 'sm' });
    modal.componentInstance.categoryDto = { ...categoryDto }
    modal.result.then((modalResultModel: ModalResultModel<CategoryDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.categoryDtos[item] = modalResultModel.data;
        this.categoryDtos = this.categoryDtos.sort((a, b) => (a.name.localeCompare(b.name)))
      }
    });
  }

  action({ name, index, row }) {
    this.edit(index, row);
  }
}