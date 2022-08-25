import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { BlogService } from '../../../../core/services/blog.service';
import { BlogEntryDto } from 'app/core/dtos/marketing/blog-entry.dto';

@Component({
   selector: 'app-blog',
   templateUrl: './blog-list.component.html',
   styleUrls: ['./blog-list.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {
   //  Public
   public pages: number[] = [];
   public currentPage: number = 1;
   public itemsPerPage: number = 5;
   public totalEntries: number = 0;
   public blogEntries: BlogEntryDto[] = [];

   /**
    * Constructor
    *
    * @param {BlogListService} _blogService
    * @param {CoreConfigService} _coreConfigService
    */
   constructor(
      private router: Router,
      private _blogService: BlogService,
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
   ngOnInit(): void {
      this.findBlogEntries(this.currentPage);
   }

   onPageChange(page: number) {
      if (page < 1 || page > this.pages.length) return;
      this.findBlogEntries(page);
   }

   findBlogEntries(page: number) {
      this._blogService.findBlogEntries({ page, itemsPerPage: this.itemsPerPage, companyId: 1 }).subscribe(data => {
         this.blogEntries = data;
         this.pages = Array.from({ length: Math.ceil(this.totalEntries / this.itemsPerPage) }, (_, i) => i + 1);
      });
   }

   viewBlogEntry(blogEntryId: number) {
      this._blogService.viewBlogEntry(blogEntryId).subscribe(isSuccess => {
         if (isSuccess) {
            this.findBlogEntries(this.currentPage);
            this.router.navigate(['/blog/details', blogEntryId]);
         }
      });
   }

   likeBlogEntry(blogEntryId: number) {
      this._blogService.likeBlogEntry(blogEntryId).subscribe(isSuccess => {
         if (isSuccess) {
            this.findBlogEntries(this.currentPage);
         }
      });
   }
}