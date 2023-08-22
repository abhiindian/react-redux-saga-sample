interface IBlogPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export type BlogPost = IBlogPost;
export type BlogPostModel = Omit<BlogPost, "id">;