import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { Post } from 'app/core/types/blog';
import { BlogService } from '../blog.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import dayjs from 'dayjs';

@Component({
   selector: 'app-blog-detail',
   templateUrl: './blog-detail.component.html',
   styleUrls: ['./blog-detail.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit {
   //  Public
   public dayjs = dayjs;
   public recentPosts: Post[] = [];
   public post: Post;

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
            this.getPost();
         }
      });
   }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit(): void {
      this.getRecentPosts();
   }

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

   getPost() {
      const postId: number = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
      const post: Post = this._blogService.getPostById(postId);
      if (!post) this.router.navigate(['/blog']);
      this.post = post;
   }

   getRecentPosts() {
      this.recentPosts = this._blogService.getRecentPosts();
   }
}
