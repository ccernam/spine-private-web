import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionDto } from 'app/core/dtos/configuration/option.dto';
import { RoleDto } from 'app/core/dtos/security/role.dto';
import { SecurityService } from 'app/core/services/security.service';

@Component({
  selector: 'app-role-option',
  templateUrl: './role-option.component.html',
  styleUrls: ['./role-option.component.scss']
})
export class RoleOptionComponent implements OnInit {

  role : RoleDto = new RoleDto();
  options: OptionDto[] = [];
  title : string = "Modificar opciones de acceso por rol"

  constructor(
    private _activeModal: NgbActiveModal,
    private _securityService: SecurityService
  ) { }

  ngOnInit(): void {
    this.getOptionsByRole();
  }

  getOptionsByRole(): void {
    this._securityService.findOptions(this.role.id, 1).subscribe(data => {      
      this.options = data;
    });
  }

  saveRoleOption(): void {
    console.log(this.options);
  }

  activateOption(optionId: number, value: boolean){
    this.options.find(x => x.id == optionId).status = (value == true ? 1 : 2);
  }

  close(): void {
    this._activeModal.close({ success: false });
 }
}
