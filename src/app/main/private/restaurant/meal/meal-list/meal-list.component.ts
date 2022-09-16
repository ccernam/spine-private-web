import { Component, OnInit } from '@angular/core';
import { CatalogDetailDto } from 'app/core/dtos/configuration/catalog-detail.dto';
import { ConfigurationService } from 'app/core/services/configuration.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  public mealTypes : CatalogDetailDto[] = [];

  constructor(
    private _configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this._configurationService.findCatalogMaster(["0601"]).subscribe(data => {
      this.mealTypes = data.find(x => x.code == "0601").details;      
    });
  }

  find()
  {
    
  }
}
