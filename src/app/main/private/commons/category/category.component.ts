import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'app/core/dtos/commons/category.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public title: string = "Crear Categoría";

  public category: CategoryDto = new CategoryDto();
  public statuses: Object[] = [];
  public reportingStatuses: Object[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _activeModalService: NgbActiveModal
  ) {
    this.category.id = 0;
    this.category.status = -1;
    this.category.reportingStatus = -1;
  }

  ngOnInit(): void {
    if (this.category.id > 0) {
      this.title = "Editar Categoría";
    }
    this.statuses = this._globalService.getStatuses();
    this.reportingStatuses = this._globalService.getReportingStatuses();
  }

  save(): void {
    if (this.validate()) {
      this.category.companyId = 1; // TODO:
      if ((this.category.id ?? 0) == 0) {
        this._commonsService.createCategory(this.category).subscribe(data => {
          this.category = data;
          this._activeModalService.close({ success: true, data: this.category });
        });
      }
      else {
        this._commonsService.editCategory(this.category).subscribe(data => {
          this.category = data;
          this._activeModalService.close({ success: true, data: this.category });
        });
      }
    }
  }

  validate(): boolean {
    return true;
  }

  close(): void {
    this._activeModalService.close({ success: false });
  }

}
