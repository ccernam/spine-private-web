import { Component, EventEmitter, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDto } from 'app/core/dtos/security/role.dto'
import { SecurityService } from 'app/core/services/security.service'
import { RoleFormComponent } from '../role-form/role-form.component';
import { RoleOptionComponent } from '../role-option/role-option.component';
import { LoadingService } from 'app/core/services/loading.service';
import { DatatableAction, DatatableColumn, DatatableColumnType } from 'app/core/types/datatable';

@Component({
   selector: 'app-security-role',
   templateUrl: './role-list.component.html',
   styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {


   public roles: RoleDto[] = [];
   //public options: OptionDto[] = []

   public columns: DatatableColumn[] = [
      { name: 'name', title: 'Nombre' },
      { name: 'description', title: 'Descripción' },
      {
         name: 'statusName', title: 'Estado', custom: {
            type: DatatableColumnType.badge
         }
      },
   ]

   public actions: DatatableAction[] = [
      { name: 'edit-role', icon: 'edit' },
      { name: 'config-options', icon: 'list' },
   ]

   constructor(
      private _loadingService: LoadingService,
      private _securityService: SecurityService,
      private modal: NgbModal
   ) { }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit() {
      this._loadingService.show();
      this._securityService.findRole().subscribe(data => {
         this._loadingService.hide();
         this.roles = data.map((item: any, index: number) => ({ ...item, number: (index + 1) }));
      });
   }

   createRole() {
      const modal = this.modal.open(RoleFormComponent, { size: 'm' });
      modal.result.then((result) => {
         if (result != null && result.success == true) {
            this.roles.push(result.role);
         }
      });
   }

   editRole(item: number, role: RoleDto) {
      const modal = this.modal.open(RoleFormComponent, { size: 'm' });
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

   action({ name, index, row }) {
      if (name === 'edit-role')
         this.editRole(index, row);
      else if (name === 'config-options')
         this.configureOptions(index, row);
   }
}
