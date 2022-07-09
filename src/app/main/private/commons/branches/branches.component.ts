import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchDto } from 'app/core/dtos/commons/branch.dto';
import { ModalResultModel } from 'app/core/models/modal-result.model';
import { CommonsService } from 'app/core/services/commons.service';
import { GlobalService } from 'app/core/services/global.service';
import { BranchComponent } from '../branch/branch.component';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  public branchDtos: BranchDto[] = [];

  constructor(
    private _commonsService: CommonsService,
    private _globalService: GlobalService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this._commonsService.findBranch({ companyId: 1 }).subscribe(data => {
      this.branchDtos = data;
    });
  }

  create(): void {
    const modal = this._modalService.open(BranchComponent, { size: 'sm' });
    modal.result.then((modalResultModel: ModalResultModel<BranchDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.branchDtos.push(modalResultModel.data);
        this.branchDtos = this.branchDtos.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      }
    });
  }

  edit(item: number, branchDto: BranchDto): void {
    const modal = this._modalService.open(BranchComponent, { size: 'sm' });
    modal.componentInstance.branchDto = { ...branchDto }
    modal.result.then((modalResultModel: ModalResultModel<BranchDto>) => {
      if (modalResultModel != null && modalResultModel.success == true) {
        this.branchDtos[item] = modalResultModel.data;
      }
    });
  }

}
