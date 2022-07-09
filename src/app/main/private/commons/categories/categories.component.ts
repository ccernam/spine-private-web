import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponseDto } from 'app/core/dtos/api-response.dto';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
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
    modal.result.then((result) => {
      if (result != null && result.success == true) {
        // this.roles.push(result.role);
        console.log(result.data);
      }
    });

  }

  edit(item: number, category: CategoryDto): void {
    const modal = this._modalService.open(CategoryComponent, { size: 'sm' });
    modal.componentInstance.category = { ...category }
    modal.result.then((result) => {
      if (result != null && result.success == true) {
        this.categories[item] = result.data;
      }
    });
  }










}
