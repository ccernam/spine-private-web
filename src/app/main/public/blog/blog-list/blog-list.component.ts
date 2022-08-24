import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { BlogData, Post } from 'app/core/types/blog';
import { BlogService } from '../blog.service';
import dayjs from 'dayjs';

@Component({
   selector: 'app-blog',
   templateUrl: './blog-list.component.html',
   styleUrls: ['./blog-list.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {
   //  Public
   public dayjs = dayjs;
   public recentPosts: Post[] = [];
   public pages: number[] = [];
   public pageSize: number = 5;
   public data: BlogData = {
      posts: [],
      total: 0,
      page: 1,
   };

   /**
    * Constructor
    *
    * @param {BlogListService} _blogService
    * @param {CoreConfigService} _coreConfigService
    */
   constructor(
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
      this.getRecentPosts();
      this.getData(this.data.page);
   }

   onPageChange(page: number) {
      if (page < 1 || page > this.pages.length) return;
      this.getData(page);
   }

   getData(page: number) {
      this.data = { ...this._blogService.getData(page, this.pageSize) };
      this.pages = Array.from({ length: Math.ceil(this.data.total / this.pageSize) }, (_, i) => i + 1);
   }

   getRecentPosts() {
      this.recentPosts = this._blogService.getRecentPosts();
   }
}
