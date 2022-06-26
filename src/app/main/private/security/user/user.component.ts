import { Component, OnInit } from '@angular/core'

@Component({
   selector: 'app-security-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
   constructor() { }

   public contentHeader: object

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit() {
      this.contentHeader = {
         headerTitle: 'Users',
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
                  name: 'User',
                  isLink: false,
               }
            ]
         }
      }
   }
}
