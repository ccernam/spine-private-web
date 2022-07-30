import { Component, OnInit } from '@angular/core';
import { ProductMovementDto } from 'app/core/dtos/logistics/product-movement.dto';
import { DatatableAction, DatatableColumn } from 'app/core/types/datatable';

@Component({
  selector: 'app-product-movement-list',
  templateUrl: './product-movement-list.component.html',
  styleUrls: ['./product-movement-list.component.scss']
})
export class ProductMovementListComponent implements OnInit {

  public productMovements: ProductMovementDto[] = [];

  public columns: DatatableColumn[] = [
    
  ]

  public actions: DatatableAction[] = [

  ]

  constructor() { }

  ngOnInit(): void {
  }

  createProductMovement(){

  }

  actionEvent({ name, index, row }) {

  }

  editEvent({ name, index, row }) {
    
  }
}
