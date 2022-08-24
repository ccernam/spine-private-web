export interface Post {
   id: number,
   img: string,
   avatar: string,
   username: string,
   title: string,
   summary: string,
   content: string,
   postedAt: Date,
   likes: number,
   views: number,
}

export interface BlogData{
   posts: Post[],
   total: number,
   page: number,
}