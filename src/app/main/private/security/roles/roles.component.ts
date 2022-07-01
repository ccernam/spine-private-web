import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDto } from 'app/core/dtos/security/role.dto'
import { SecurityService } from 'app/core/services/security.service'
import { RoleComponent } from '../role/role.component';

@Component({
   selector: 'app-security-role',
   templateUrl: './roles.component.html',
   styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {


   public roles: RoleDto[] = [];

   constructor(
      private _securityService: SecurityService,
      private modal: NgbModal
   ) { }

   public contentHeader: object

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit() {

      this._securityService.findRole().subscribe(apiResponseDto => {
         this.roles = apiResponseDto.data;
         console.log(this.roles);
      })

      this.contentHeader = {
         headerTitle: 'Roles',
         actionButton: false,
         breadcrumb: {
            type: '',
            links: [
               {
                  name: 'Home',
                  isLink: true,
                  link: '/',
               },
               {
                  name: 'Security',
                  isLink: false,
               },
               {
                  name: 'Role',
                  isLink: false,
               }
            ]
         }
      }
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
      alert("configureOptions");
      console.log("item", item);
      console.log("role", role);
   }
}
