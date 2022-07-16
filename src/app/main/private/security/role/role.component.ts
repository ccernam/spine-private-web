import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDto } from 'app/core/dtos/security/role.dto';
import { SecurityService } from 'app/core/services/security.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

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
      private _activeModal: NgbActiveModal,
      private _toastrService: CustomToastrService
   ) { }

   ngOnInit(): void {
      if (this.role.id > 0)
         this.title = "Editar Rol";
   }

   saveRole(): void {
      let isValid: boolean = false;

      if (!this.role.name || !this.role.name.trim()) {
         this._toastrService.warning("'Nombre' es requerido!");
      } else if (!this.role.description || !this.role.description.trim()) {
         this._toastrService.warning("'Descripción' es requerido!");
      } else {
         isValid = true;
      }

      if (!isValid) return;

      if ((this.role.id ?? 0) == 0) {
         this.role.status = 1;
         this.role.reportingStatus = 1;
         this._securityService.createRole(this.role).subscribe(data => {
            this.role = data;
            this._activeModal.close({ success: true, role: this.role });
         });
      }
      else {
         this._securityService.editRole(this.role).subscribe(data => {
            this.role = data;
            this._activeModal.close({ success: true, role: this.role });
         });
      }
   }

   close(): void {
      this._activeModal.close({ success: false });
   }
}
