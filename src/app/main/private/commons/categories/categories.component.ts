import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponseDto } from 'app/core/dtos/api-response.dto';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
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
    private _modalService: NgbModal
  ) { }

  categories: CategoryDto[] = [];

  ngOnInit(): void {
    this._commonsService.findCategory().subscribe(data => {
      this.categories = data;
    });
  }

  create(): void {
    const modal = this._modalService.open(CategoryComponent, { size: 'sm' });
    modal.result.then((result: ModalResultModel<CategoryDto>) => {
      if (result != null && result.success == true) {
        this.categories.push(result.data);
        this.categories = this.categories.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      }
    });
  }

  edit(item: number, category: CategoryDto): void {
    const modal = this._modalService.open(CategoryComponent, { size: 'sm' });
    modal.componentInstance.category = { ...category }
    modal.result.then((result: ModalResultModel<CategoryDto>) => {
      if (result != null && result.success == true) {
        this.categories[item] = result.data;
      }
    });
  }










}
