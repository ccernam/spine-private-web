import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDto } from 'app/core/dtos/security/role.dto';
import { SecurityService } from 'app/core/services/security.service';
import { SweetAlertService } from 'app/core/services/sweetalert.service';
import { CustomToastrService } from 'app/core/services/toastr.service';

@Component({
   selector: 'app-role',
   templateUrl: './role-form.component.html',
   styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

   role: RoleDto = new RoleDto();
   title: string = "Crear Rol";

   constructor(
      private _securityService: SecurityService,
      private _activeModal: NgbActiveModal,
      private _toastrService: CustomToastrService,
      private _sweetAlertService: SweetAlertService
   ) { }

   ngOnInit(): void {
      if (this.role.id > 0)
         this.title = "Editar Rol";
   }

   isValid(): boolean {
      if (!this.role.name || !this.role.name.trim()) {
         this._toastrService.warning("'Nombre' es requerido!");
      } else if (!this.role.description || !this.role.description.trim()) {
         this._toastrService.warning("'Descripción' es requerido!");
      } else {
         return true;
      }

      return false
   }

   async saveRole(): Promise<void> {
      if (!this.isValid()) return;

      const result: any = await this._sweetAlertService.confirm({
         content: "¿Está seguro que desea guardar este rol?<br /> tendrá que asignarle permisos a este rol."
      });

      if(!result.value) return;

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
