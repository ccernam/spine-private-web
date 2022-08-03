import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
  selector: 'app-product-movement-form',
  templateUrl: './product-movement-form.component.html',
  styleUrls: ['./product-movement-form.component.scss']
})
export class ProductMovementFormComponent implements OnInit {

  constructor(
    private _activeModal: NgbActiveModal,    
    private _toastrService: CustomToastrService
  ) { }

  title: string = "Crear nuevo movimiento de almacén"
  ngOnInit(): void {
  }

  saveActiveProductMovent():void {
    
  }

  saveTempProductMovent():void {
    
  }

  close(): void {
    this._activeModal.close({ success: false });
  }
}
