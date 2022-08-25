import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { BlogService } from '../../../../core/services/blog.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BlogEntryDto } from 'app/core/dtos/marketing/blog-entry.dto';

@Component({
   selector: 'app-blog-detail',
   templateUrl: './blog-detail.component.html',
   styleUrls: ['./blog-detail.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit {
   //  Public
   public blogEntry: BlogEntryDto;

   /**
    * Constructor
    *
    * @param {BlogListService} _blogService
    * @param {CoreConfigService} _coreConfigService
    */
   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _blogService: BlogService,
      private _coreConfigService: CoreConfigService
   ) {
      router.events.subscribe((val) => {
         if (val instanceof NavigationEnd) {
            this.configureLayout();
            this.viewBlogEntry();
         }
      });
   }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit(): void { }

   configureLayout() {
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

   getBlogEntryId() {
      const blogEntryId: number = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
      return blogEntryId;
   }

   findBlogEntry(blogEntryId: number) {
      this._blogService.findBlogEntries().subscribe(data => {
         const blogEntry: BlogEntryDto = data.find(x => x.id === blogEntryId);
         if (!blogEntry) this.router.navigate(['/blog']);
         this.blogEntry = blogEntry;
      });
   }

   viewBlogEntry() {
      const blogEntryId: number = this.getBlogEntryId();
      this._blogService.viewBlogEntry(blogEntryId).subscribe(isSuccess => {
         if (isSuccess) {
            this.findBlogEntry(blogEntryId);
         }
      });
   }

   likeBlogEntry() {
      const blogEntryId: number = this.getBlogEntryId();
      this._blogService.likeBlogEntry(blogEntryId).subscribe(isSuccess => {
         if (isSuccess) {
            this.findBlogEntry(blogEntryId);
         }
      });
   }
}
