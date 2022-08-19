import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { CommonsService } from 'app/core/services/commons.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  title: string = "Crear persona"
  public formType: number = 1;
  public personTypes: CatalogDetailDto[] = [];
  public documentTypes : CatalogDetailDto[] = [];

  constructor(
    private _activeModal: NgbActiveModal,
    private _commonsService : CommonsService
  ) { }

  ngOnInit(): void {
  }

  close(): void
  {
    this._activeModal.close({ success: false });
  }
}
