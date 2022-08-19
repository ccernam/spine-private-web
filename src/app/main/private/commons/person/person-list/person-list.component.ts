import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonsService } from 'app/core/services/commons.service';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    private _commonsService : CommonsService
  ) { }

  ngOnInit(): void {
  }

  createPerson()
  {
    const modal = this.modal.open(PersonFormComponent, { size: 'xl' });    

    modal.result.then((result) => {

    });
  }
}
