import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonAddressDto } from 'app/core/dtos/commons/person-address.dto';
import { PersonContactDto } from 'app/core/dtos/commons/person-contact.dto';
import { PersonDto } from 'app/core/dtos/commons/person.dto';
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

  public personDto : PersonDto = new PersonDto();
  public personContactDto : PersonContactDto = new PersonContactDto();
  public personAddressDto : PersonAddressDto = new PersonAddressDto();

  public personContacts : PersonContactDto[] = [];
  public personAddresses : PersonAddressDto[] = [];

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
