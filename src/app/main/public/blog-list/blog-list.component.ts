import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';

@Component({
   selector: 'app-blog',
   templateUrl: './blog-list.component.html',
   styleUrls: ['./blog-list.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {
   //  Public
   public coreConfig: any;

   /**
    * Constructor
    *
    * @param {CoreConfigService} _coreConfigService
    */
   constructor(
      private _coreConfigService: CoreConfigService
   ) {
      // Configure the layout
      this._coreConfigService.config = {
         layout: {
            menu: {
               hidden: true
            },
            navbar: {
               type: 'navbar-static-top'
             },
            footer: {
               hidden: true
            },
            customizer: false,
            enableLocalStorage: false
         }
      };
   }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit(): void { }
}
