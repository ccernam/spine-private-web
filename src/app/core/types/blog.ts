export interface Post {
   id: number,
   img: string,
   avatar: string,
   username: string,
   title: string,
   summary: string,
   content: string,
   posted: Date,
   likes: number,
}

export interface BlogData{
   posts: Post[],
   total: number,
   page: number,
}