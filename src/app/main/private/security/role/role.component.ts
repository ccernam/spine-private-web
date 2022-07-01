import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponseDto } from 'app/core/dtos/api-response.dto';
import { RoleDto } from 'app/core/dtos/security/role.dto';
import { SecurityService } from 'app/core/services/security.service';
import { timeStamp } from 'console';

@Component({
   selector: 'app-role',
   templateUrl: './role.component.html',
   styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

   role: RoleDto = new RoleDto();
   title: string = "Crear Rol";

   constructor(
      private _securityService: SecurityService,
      private _activeModal: NgbActiveModal
   ) { }

   ngOnInit(): void {
      if (this.role.id > 0)
         this.title = "Editar Rol";
   }

   saveRole(): void {
      // validations
      if ((this.role.id ?? 0) == 0) {
         this.role.status = 1;
         this.role.reportingStatus = 1;
         this._securityService.createRole(this.role).subscribe(apiResponseDto => {
            if (apiResponseDto.type == 1) {
               this.role = apiResponseDto.data;
               this._activeModal.close({ success: true, role: this.role });
            }
         });
      }
      else {
         this._securityService.editRole(this.role).subscribe(apiResponseDto => {
            if (apiResponseDto.type == 1) {
               this.role = apiResponseDto.data;
               this._activeModal.close({ success: true, role: this.role });
            }
         });
      }
   }

   close(): void {
      this._activeModal.close({ success: false });
   }
}
