import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogData, Post } from 'app/core/types/blog';

@Injectable()
export class BlogService {
   // Public
   private content: string = `<p>
      Before you get into the nitty-gritty of coming up with a perfect title, start with a rough
      draft: your working title. What is that, exactly? A lot of people confuse working titles with
      topics. Let's clear that Topics are very general and could yield several different blog posts.
      Think "raising healthy kids," or "kitchen storage." A writer might look at either of those
      topics and choose to take them in very, very different directions.A working title, on the other
      hand, is very specific and guides the creation of a single blog post. For example, from the
      topic "raising healthy kids," you could derive the following working title See how different and
      specific each of those is? That's what makes them working titles, instead of overarching topics.
   </p>
   <h4>Unprecedented Challenge</h4>
   <ul class="p-0 mb-2">
      <li class="d-block"><span class="mr-25">-</span><span>Preliminary thinking systems</span></li>
      <li class="d-block"><span class="mr-25">-</span><span>Bandwidth efficient</span></li>
      <li class="d-block"><span class="mr-25">-</span><span>Green space</span></li>
      <li class="d-block"><span class="mr-25">-</span><span>Social impact</span></li>
      <li class="d-block"><span class="mr-25">-</span><span>Thought partnership</span></li>
      <li class="d-block"><span class="mr-25">-</span><span>Fully ethical life</span></li>
   </ul>`;
   public posts: Post[] = [
      { id: 1, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '1 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 2, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '2 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 3, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '3 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 4, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '4 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 5, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '5 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 6, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '6 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 7, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '7 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 8, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '8 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 9, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '9 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 10, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '10 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 11, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '11 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 12, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '12 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 13, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '13 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 14, img: 'assets/images/slider/02.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: '14 The Best Features Coming to iOS and Web design', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
   ];
   public recentPosts: Post[] = [
      { id: 5, img: 'assets/images/banner/banner-22.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: 'Why Should Forget Facebook?', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
      { id: 10, img: 'assets/images/banner/banner-27.jpg', avatar: 'assets/images/portrait/small/avatar-s-7.jpg', username: 'Ghani Pradita', title: 'Publish your passions, your way', summary: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream', content: this.content, postedAt: new Date(), likes: 0, views: 0 },
   ]

   /**
    * Constructor
    *
    * @param {HttpClient} _httpClient
    */
   constructor(private _httpClient: HttpClient) { }

   /**
    * Get Data
    */
   getData(page: number, pageSize: number): BlogData {
      const data: BlogData = {
         posts: this.posts.slice((page - 1) * pageSize, page * pageSize),
         total: this.posts.length,
         page: page,
      };

      return data;
   }

   /**
    * Get Post by id
    */
   getPostById(id: number): Post {
      return this.posts.find((post: Post) => post.id === id);
   }

   /**
    * Get Recent Posts
    */
   getRecentPosts(): Post[] {
      return this.recentPosts;
   }
}
