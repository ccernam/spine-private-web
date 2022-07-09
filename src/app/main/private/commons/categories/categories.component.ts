import { Component, OnInit } from '@angular/core';
import { ApiResponseDto } from 'app/core/dtos/api-response.dto';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService
  ) { }

  categories: CategoryDto[] = [];

  ngOnInit(): void {
    this._commonsService.findCategory().subscribe(data => {
      this.categories = data;
    });
  }

  createCategory(): void {
  }

  editCategory(item: number, categoryDto: CategoryDto): void {
  }










}
