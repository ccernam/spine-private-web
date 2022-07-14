import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDto } from 'app/core/dtos/security/role.dto'
import { SecurityService } from 'app/core/services/security.service'
import { RoleComponent } from '../role/role.component';
import { RoleOptionComponent } from '../role-option/role-option.component';

@Component({
   selector: 'app-security-role',
   templateUrl: './roles.component.html',
   styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {


   public roles: RoleDto[] = [];
   //public options: OptionDto[] = []

   constructor(
      private _securityService: SecurityService,
      private modal: NgbModal
   ) { }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit() {
      this._securityService.findRole().subscribe(data => {
         this.roles = data;
      });
   }

   createRole() {
      const modal = this.modal.open(RoleComponent, { size: 'm' });
      modal.result.then((result) => {
         if (result != null && result.success == true) {
            this.roles.push(result.role);
         }
      });
   }

   editRole(item: number, role: RoleDto) {
      const modal = this.modal.open(RoleComponent, { size: 'm' });
      modal.componentInstance.role = { ...role };
      modal.result.then((result) => {
         if (result != null && result.success == true) {
            this.roles[item] = result.role;
         }
      });
   }

   configureOptions(item: number, role: RoleDto) {
      const modal = this.modal.open(RoleOptionComponent, { size: 'lg' });
      modal.componentInstance.role = { ...role };
      modal.result.then((result) => {

      });
   }
}
