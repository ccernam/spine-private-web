import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { CommonsService } from 'app/core/services/commons.service';
import { ConfigurationService } from 'app/core/services/configuration.service';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  public personTypes: CatalogDetailDto[] = [];
  public documentTypes : CatalogDetailDto[] = [];

  constructor(
    private modal: NgbModal,
    private _commonsService : CommonsService,
    private _configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this._configurationService.findCatalogMaster(["0501", "0502"]).subscribe(data => {
      this.personTypes = data.find(x => x.code == "0501").details;
      this.documentTypes = data.find(x => x.code == "0502").details;
    });
  }

  createPerson()
  {
    const modal = this.modal.open(PersonFormComponent, { size: 'xl' });    
    modal.componentInstance.personTypes = [ ...this.personTypes ];
    modal.componentInstance.documentTypes = [ ...this.documentTypes ]
    modal.result.then((result) => {

    });
  }
}
