import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementUnitDto } from 'app/core/dtos/commons/measurement-unit.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { LoadingService } from 'app/core/services/loading.service';
import { MeasurementUnitComponent } from '../measurement-unit/measurement-unit.component';

@Component({
  selector: 'app-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss']
})
export class MeasurementUnitsComponent implements OnInit {

  constructor(
    private _commonsService: CommonsService,
    private _loadingService: LoadingService,
    private _globalService: GlobalService,
    private _modalService: NgbModal
  ) { }

  public measurementUnitDtos: MeasurementUnitDto[] = [];

  ngOnInit(): void {
    this._loadingService.show();
    this._commonsService.findMeasurementUnit({ companyId: 1 }).subscribe(data => {
      this.measurementUnitDtos = data;
      this._loadingService.hide();
      console.log(this.measurementUnitDtos);
    });
  }

  create(): void {
    const modal = this._modalService.open(MeasurementUnitComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<MeasurementUnitDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.measurementUnitDtos.push(modalResultModel.data);
        this.measurementUnitDtos = this.measurementUnitDtos.sort((a, b) => (a.name.localeCompare(b.name)))
      }
    });
  }

  edit(item: number, measurementUnitDto: MeasurementUnitDto): void {
    const modal = this._modalService.open(MeasurementUnitComponent, { size: 'sm' });
    modal.componentInstance.measurementUnitDto = { ...measurementUnitDto }
    modal.result.then((modalResultModel: ModalResultModel<MeasurementUnitDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.measurementUnitDtos[item] = modalResultModel.data;
        this.measurementUnitDtos = this.measurementUnitDtos.sort((a, b) => (a.name.localeCompare(b.name)))
      }
    });
  }
}
