import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonAddressDto } from 'app/core/dtos/commons/person-address.dto';
import { PersonContactDto } from 'app/core/dtos/commons/person-contact.dto';
import { PersonDto } from 'app/core/dtos/commons/person.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';

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

  public personStatus : boolean;
  public isFiscalAddress : boolean;
  public isBillingMail : boolean;

  public addressColumns : DatatableColumn[] = [
    {
      name : 'address',
      title : 'Direccion',
      width : 50
    },
    {
      name : 'addressReference',
      title : 'Referencia',
      width : 80
    },
    {
      name : 'isFiscalAddress',
      title : 'Direccion Fiscal',
      width : 10,
      class: 'justify-content-center',
      custom: {
        name: 'isFiscalAddress',
        values: [
           { value: false, class: 'badge-danger' },
           { value: true, class: 'badge-success' },
        ],
        type: DatatableColumnType.badge
     }
    },
    {
      name: 'statusName',
      title: 'Estado',
      width: 20,
      class: 'justify-content-center',
      custom: {
         name: 'status',
         values: [
            { value: 0, class: 'badge-danger' },
            { value: 1, class: 'badge-success' },
         ],
         type: DatatableColumnType.badge
      }
    }
  ]

  public addressActions : DatatableAction[] = [
    { name: 'delete-person-address', title: 'Eliminar', icon: 'delete', width: 40 },
  ]

  public contactColumns : DatatableColumn[] = [
    {
      name : 'name',
      title : 'Nombre',
      width : 50
    },
    {
      name : 'position',
      title : 'Cargo',
      width : 50
    },
    {
      name : 'phoneNumber',
      title : 'Teléfono',
      width : 50
    },
    {
      name : 'mobileNumber',
      title : 'Celular',
      width : 50
    },
    {
      name : 'email',
      title : 'E-Mail',
      width : 50
    },
    {
      name : 'isBillingMail',
      title : 'Contacto Facturacion',
      width : 10,
      class: 'justify-content-center',
      custom: {
        name: 'isBillingMail',
        values: [
           { value: false, class: 'badge-danger' },
           { value: true, class: 'badge-success' },
        ],
        type: DatatableColumnType.badge
     }
    },
    {
      name: 'statusName',
      title: 'Estado',
      width: 20,
      class: 'justify-content-center',
      custom: {
         name: 'status',
         values: [
            { value: 0, class: 'badge-danger' },
            { value: 1, class: 'badge-success' },
         ],
         type: DatatableColumnType.badge
      }
    }
  ]

  public contactActions : DatatableAction[] = [
    { name: 'delete-person-contact', title: 'Eliminar', icon: 'delete', width: 40 },
  ]

  constructor(
    private _activeModal: NgbActiveModal,
    private _commonsService : CommonsService
  ) { }

  ngOnInit(): void {
    if (this.formType == 1)
    {
      this.personDto.isCustomer = true;
      this.personStatus = true;
    }

    this.isFiscalAddress = true;
    this.isBillingMail = true;
  }

  close(): void
  {
    this._activeModal.close({ success: false });
  }

  changePersonStatus()
  {
    if(this.personStatus)
    {
      this.personStatus = false;
    }
    else
    {
      this.personStatus = true;
    }
  }

  changeFiscalAddress()
  {
    if (this.isFiscalAddress)
    {
      this.isFiscalAddress = false;
    }
    else
    {
      this.isFiscalAddress = true;
    }
    this.personAddressDto.isFiscalAddress = this.isFiscalAddress;
  }

  addAddress()
  {
    this.personAddressDto.id = 0;
    this.personAddressDto.status = 1;
    this.personAddressDto.statusName = "Activado";
    this.personAddressDto.isFiscalAddress = this.isFiscalAddress;
    let newAddress : PersonAddressDto = { ...this.personAddressDto }
    this.personAddresses = [  ...this.personAddresses, newAddress];
    this.clearAddressValues();
  }  

  addressActionEvent({ name, index, row })
  {
    if (name == 'delete-person-address')
    {
      this.deleteAddress(index, row);
    }
  }

  deleteAddress(index: number, personAddress : PersonAddressDto)
  {
    let localPersonAddresses : PersonAddressDto[] = [ ...this.personAddresses ];
    localPersonAddresses.splice(index, 1);
    this.personAddresses = [ ... localPersonAddresses]
  }

  clearAddressValues() {
    this.personAddressDto = new PersonAddressDto();
  }

  changeBillingMail()
  {
    if (this.isBillingMail)
    {
      this.isBillingMail = false;
    }
    else
    {
      this.isBillingMail = true;
    }
  }

  addContact()
  {
    this.personContactDto.id = 0;
    this.personContactDto.status = 1;
    this.personContactDto.statusName = "Activado";
    this.personContactDto.isBillingMail = this.isBillingMail;
    let newContact:PersonContactDto = { ...this.personContactDto };
    this.personContacts = [ ...this.personContacts, newContact ];
    this.clearContactValues();
  }

  contactActionEvent({ name, index, row })
  {
    if (name == 'delete-person-contact')
    {
      this.deleteContact(index, row);
    }
  }

  deleteContact(index: number, personContact : PersonContactDto)
  {
    let localPersonContacts : PersonContactDto[] = [ ...this.personContacts ];
    localPersonContacts.splice(index, 1);
    this.personContacts = [ ...localPersonContacts ];
  }

  clearContactValues() {
    this.personContactDto = new PersonContactDto();
  }
}
