import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonDto } from 'app/core/dtos/commons/person.dto';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { ConfigurationService } from 'app/core/services/configuration.service';
import { LoadingService } from 'app/core/services/loading.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  public persons: PersonDto[] = [];

  public personTypes: CatalogDetailDto[] = [];
  public documentTypes : CatalogDetailDto[] = [];
  public parameters: { companyId?:number, type?:number, docType?:number, document?:string, name?:string, isCustomer?:boolean, isProvider?:boolean, status?: number } = {};
  public personStatus: boolean;

  public columns: DatatableColumn[] = [
    {
      name:'typeName',
      title: 'Tipo Persona',
      width: 50
    },
    {
      name:'docTypeName',
      title: 'Tipo Doc',
      width: 50
    },
    {
      name:'document',
      title: 'Documento',
      width: 50
    },
    {
      name:'fullName',
      title: 'Nombres',
      width: 100
    },
    {
      name:'businessRepresentative',
      title: 'Representante',
      width: 50
    },
    {
      name:'comments',
      title: 'Comentario',
      width: 50
    },
    {
      name: 'isCustomer',
      title: 'Cliente',
      width: 10,
      class: 'justify-content-center',
      custom: {
         name: 'isCustomer',
         values: [
            { value: false, class: 'badge-danger' },
            { value: true, class: 'badge-success' },
         ],
         type: DatatableColumnType.badge
      }
    },
    {
      name: 'isProvider',
      title: 'Proveedor',
      width: 10,
      class: 'justify-content-center',
      custom: {
         name: 'isProvider',
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
       width: 50,
       class: 'justify-content-center',
       custom: {
          name: 'status',
          values: [
             { value: 0, class: 'badge-danger' },
             { value: 1, class: 'badge-success' }
          ],
          type: DatatableColumnType.badge
       }
    }
  ]

  public actions: DatatableAction[] = [
    { name: 'edit-person', title: 'Editar', icon: 'edit', width: 50 },    
    { name: 'view-person', title: 'Ver', icon: 'search', width: 50 }
 ]

  constructor(
    private modal: NgbModal,
    private _loadingService : LoadingService,
    private _commonsService : CommonsService,
    private _configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this._configurationService.findCatalogMaster(["0501", "0502"]).subscribe(data => {
      this.personTypes = data.find(x => x.code == "0501").details;
      this.documentTypes = data.find(x => x.code == "0502").details;
    });
    this.personStatus = true;
    this.parameters.isCustomer = true;
  }

  createPerson()
  {
    this.openDetailModal(1, "Crear Persona", null);
  }

  actionEvent({ name, index, row }) {
    if (name == 'edit-person') {
      this.editPerson(index, row);
   }
   else if (name == 'view-person') {
      this.viewPerson(index, row);
   }
  }

  editPerson(item:number, person: PersonDto)
  {
    this.openDetailModal(2, "Editar Persona", person);
  }

  viewPerson(item:number, person: PersonDto)
  {
    this.openDetailModal(3, "Persona", person);
  }

  openDetailModal(type: number, title: string, person: PersonDto): void
  {
    const modal = this.modal.open(PersonFormComponent, { size: 'xl' });    
    modal.componentInstance.personTypes = [ ...this.personTypes ];
    modal.componentInstance.documentTypes = [ ...this.documentTypes ]

    modal.componentInstance.title = title
    modal.componentInstance.formType = type;

    if (type == 2 || type == 3) {
      modal.componentInstance.personDto = { ...person };
    }

    modal.result.then((result) => {

    });
  }

  find() 
  {
    if (this.parameters.isCustomer)
    {
      this.parameters.isProvider = false;
    }
    else
    {
        this.parameters.isProvider = true;
    }
    this.parameters.status = this.personStatus == true ? 1 : 2;
    this.parameters.document = this.parameters.document??"".toString();
    this._commonsService.findPersonHeader({ companyId: 1, type: this.parameters.type, docType: this.parameters.docType, document: this.parameters.document, name: this.parameters.name, isCustomer:this.parameters.isCustomer, isProvider:this.parameters.isProvider, status: this.parameters.status }).subscribe(data => {
      this.persons = data.map((item: any, index: number) => ({ ...item, number: (index + 1), checked: item.status == 1 }));
    });
  }

  changePersonStatus() {
    if (this.personStatus) {
       this.personStatus = false;
    }
    else {
       this.personStatus = true;
    }
 }
}
