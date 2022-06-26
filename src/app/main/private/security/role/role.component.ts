import { Component, OnInit } from '@angular/core'

@Component({
   selector: 'app-security-role',
   templateUrl: './role.component.html',
   styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
   constructor() { }

   public contentHeader: object

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit() {
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
}
