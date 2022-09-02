import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonAddressDto } from 'app/core/dtos/commons/person-address.dto';
import { PersonContactDto } from 'app/core/dtos/commons/person-contact.dto';
import { PersonDto } from 'app/core/dtos/commons/person.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';
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
   public documentTypes: CatalogDetailDto[] = [];

   public personDto: PersonDto = new PersonDto();
   public personContactDto: PersonContactDto = new PersonContactDto();
   public personAddressDto: PersonAddressDto = new PersonAddressDto();

   public personContacts: PersonContactDto[] = [];
   public personAddresses: PersonAddressDto[] = [];

   public personStatus: boolean;
   public isFiscalAddress: boolean;
   public isBillingMail: boolean;

   public addressColumns: DatatableColumn[] = [
      {
         name: 'address',
         title: 'Direccion',
         width: 50
      },
      {
         name: 'addressReference',
         title: 'Referencia',
         width: 80
      },
      {
         name: 'isFiscalAddress',
         title: 'Direccion Fiscal',
         width: 10,
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

   public addressActions: DatatableAction[] = [
      { name: 'delete-person-address', title: 'Eliminar', icon: 'delete', width: 40 },
   ]

   public contactColumns: DatatableColumn[] = [
      {
         name: 'name',
         title: 'Nombre',
         width: 50
      },
      {
         name: 'position',
         title: 'Cargo',
         width: 50
      },
      {
         name: 'phoneNumber',
         title: 'Teléfono',
         width: 50
      },
      {
         name: 'mobileNumber',
         title: 'Celular',
         width: 50
      },
      {
         name: 'email',
         title: 'E-Mail',
         width: 50
      },
      {
         name: 'isBillingMail',
         title: 'Contacto Facturacion',
         width: 10,
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

   public contactActions: DatatableAction[] = [
      { name: 'delete-person-contact', title: 'Eliminar', icon: 'delete', width: 40 },
   ]

   constructor(
      private _activeModal: NgbActiveModal,
      private _commonsService: CommonsService,
      private _toastrService: CustomToastrService,
      private _sweetAlertService: SweetAlertService
   ) { }

   ngOnInit(): void {
      if (this.formType == 1) {
         this.personDto.isCustomer = true;
         this.personStatus = true;
      }

      this.isFiscalAddress = true;
      this.isBillingMail = true;
   }

   close(): void {
      this._activeModal.close({ success: false });
   }

   changePersonStatus() {
      if (this.personStatus) {
         this.personStatus = false;
      }
      else {
         this.personStatus = true;
      }
   }

   changeFiscalAddress() {
      if (this.isFiscalAddress) {
         this.isFiscalAddress = false;
      }
      else {
         this.isFiscalAddress = true;
      }
      this.personAddressDto.isFiscalAddress = this.isFiscalAddress;
   }

   addAddress() {
      this.personAddressDto = this.fillAddressEmptyStrings(this.personAddressDto);
      if (this.isInvalidAddress(this.personAddressDto)) {
         return;
      }
      this.personAddressDto.id = 0;
      this.personAddressDto.status = 1;
      this.personAddressDto.statusName = "Activado";
      this.personAddressDto.isFiscalAddress = this.isFiscalAddress;
      let newAddress: PersonAddressDto = { ...this.personAddressDto }
      this.personAddresses = [...this.personAddresses, newAddress];
      this.clearAddressValues();
   }

   addressActionEvent({ name, index, row }) {
      if (name == 'delete-person-address') {
         this.deleteAddress(index, row);
      }
   }

   deleteAddress(index: number, personAddress: PersonAddressDto) {
      let localPersonAddresses: PersonAddressDto[] = [...this.personAddresses];
      localPersonAddresses.splice(index, 1);
      this.personAddresses = [...localPersonAddresses]
   }

   clearAddressValues() {
      this.personAddressDto = new PersonAddressDto();
   }

   changeBillingMail() {
      if (this.isBillingMail) {
         this.isBillingMail = false;
      }
      else {
         this.isBillingMail = true;
      }
   }

   addContact() {
      this.personContactDto = this.fillContactEmptyStrings(this.personContactDto);
      if (this.isInvalidContact(this.personContactDto)) {
         return;
      }
      this.personContactDto.id = 0;
      this.personContactDto.status = 1;
      this.personContactDto.statusName = "Activado";
      this.personContactDto.isBillingMail = this.isBillingMail;
      this.personContactDto.phoneNumber = this.personContactDto.phoneNumber.toString();
      this.personContactDto.mobileNumber = this.personContactDto.mobileNumber.toString();
      let newContact: PersonContactDto = { ...this.personContactDto };
      this.personContacts = [...this.personContacts, newContact];
      this.clearContactValues();
   }

   contactActionEvent({ name, index, row }) {
      if (name == 'delete-person-contact') {
         this.deleteContact(index, row);
      }
   }

   deleteContact(index: number, personContact: PersonContactDto) {
      let localPersonContacts: PersonContactDto[] = [...this.personContacts];
      localPersonContacts.splice(index, 1);
      this.personContacts = [...localPersonContacts];
   }

   clearContactValues() {
      this.personContactDto = new PersonContactDto();
   }

   async savePerson() {
      this.personDto = this.fillPersonEmptyStrings(this.personDto);
      if (this.isValidPerson(this.personDto)) {
         return;
      }

      const result: any = await this._sweetAlertService.confirm({
         content: "¿Está seguro que desea guardar ésta persona?"
      });

      if (!result.value) return;

      if (this.personDto.isCustomer) {
         this.personDto.isProvider = false;
      }
      else {
         this.personDto.isProvider = true;
      }

      this.personDto.companyId = 1;
      this.personDto.status = this.personStatus == true ? 1 : 2;
      this.personDto.document = this.personDto.document.toString();
      this.personDto.contacts = [...this.personContacts];
      this.personDto.addresses = [...this.personAddresses]

      if (this.formType == 1) {
         this.personDto.id = 0;
         this._commonsService.createPerson(this.personDto).subscribe(data => {
            this._toastrService.success("Agregado correctamente");
            this._activeModal.close({ success: true });
         });
      }
      else if (this.formType == 2) {

      }
   }

   private fillPersonEmptyStrings(personDto: PersonDto): PersonDto {
      personDto.firstName = personDto.firstName ?? "";
      personDto.middleName = personDto.middleName ?? "";
      personDto.maternalLastName = personDto.maternalLastName ?? "";
      personDto.paternalLastName = personDto.paternalLastName ?? "";
      personDto.businessName = personDto.businessName ?? "";
      personDto.businessRepresentative = personDto.businessRepresentative ?? "";
      return personDto;
   }

   private fillAddressEmptyStrings(addressDto: PersonAddressDto): PersonAddressDto {
      this.personAddressDto.address = this.personAddressDto.address ?? "";
      this.personAddressDto.addressReference = this.personAddressDto.addressReference ?? "";
      return addressDto;
   }

   private fillContactEmptyStrings(contactDto: PersonContactDto): PersonContactDto {
      this.personContactDto.name = this.personContactDto.name ?? "";
      this.personContactDto.position = this.personContactDto.position ?? "";
      this.personContactDto.phoneNumber = this.personContactDto.phoneNumber ?? "";
      this.personContactDto.mobileNumber = this.personContactDto.mobileNumber ?? "";
      this.personContactDto.email = this.personContactDto.email ?? "";
      return contactDto;
   }

   private isValidPerson(personDto: PersonDto): boolean {
      let validationMessage: string = "";
      if (this.personDto.type == null || this.personDto.type == undefined) {
         validationMessage = validationMessage.concat("* Debe seleccionar un tipo de persona.<br>");
      }

      if (this.personDto.docType == null || this.personDto.docType == undefined) {
         validationMessage = validationMessage.concat("* Debe seleccionar un tipo de documento.<br>");
      }

      if (this.personDto.document == "") {
         validationMessage = validationMessage.concat("* Debe escribir un documento .<br>");
      }

      if (this.personDto.paternalLastName == "" && this.personDto.maternalLastName == "" && this.personDto.firstName == "" && this.personDto.middleName == "" && personDto.businessName == "") {
         validationMessage = validationMessage.concat("* Debe escribir un nombre o razón social.<br>");
      }

      if (personDto.businessName != "" && personDto.businessRepresentative == "") {
         validationMessage = validationMessage.concat("* Debe escribir un representante legal.<br>");
      }

      if ((this.personDto.paternalLastName != "" || this.personDto.maternalLastName != "" || this.personDto.firstName != "" || this.personDto.middleName != "") && (this.personDto.paternalLastName == "" || this.personDto.maternalLastName == "" || this.personDto.firstName == "")) {
         validationMessage = validationMessage.concat("* Debe completar los nombres y apellidos de la persona.<br>");
      }

      if (this.personContacts.length < 1)
      {
         validationMessage = validationMessage.concat("* Debe agregar al menos un contacto.<br>");
      }

      if (this.personAddresses.length < 1)
      {
         validationMessage = validationMessage.concat("* Debe agregar al menos una dirección.<br>");
      }

      if (validationMessage.length > 0) {
         this._toastrService.htmlWarning(validationMessage);
         return true;
      }
      return false;
   }

   private isInvalidContact(contactDto: PersonContactDto): boolean {
      let validationMessage: string = "";
      if (contactDto.name == "") {
         validationMessage = validationMessage.concat("* Debe escribir el nombre de contacto.<br>");
      }

      if (contactDto.mobileNumber == "" && contactDto.phoneNumber == "") {
         validationMessage = validationMessage.concat("* Debe escribir al menos un número de contacto.<br>");
      }

      if (contactDto.email == "") {
         validationMessage = validationMessage.concat("* Debe escribir un email.<br>");
      }

      if (validationMessage.length > 0) {
         this._toastrService.htmlWarning(validationMessage);
         return true;
      }
      return false;
   }

   private isInvalidAddress(addressDto: PersonAddressDto): boolean {
      if (addressDto.address == "") {
         this._toastrService.warning("Debe escribir la dirección");
         return true;
      }
      return false;
   }
}
