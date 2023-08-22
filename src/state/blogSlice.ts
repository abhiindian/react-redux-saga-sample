import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogPost, BlogPostModel } from "../types/BlogTypes";


export interface BlogState {
    blogPosts: Array<BlogPost>;
    loading: boolean;
}

const initialState: BlogState = {
    blogPosts: [],
    loading: false
}

export const blogSlice = createSlice({
    initialState,
    name: 'blog',
    reducers: {
        fetchPosts: (state: BlogState) => {
            state.loading = true;
        },
        setPosts: (state: BlogState, action: PayloadAction<Array<BlogPost>>) => {
            state.blogPosts = [...action.payload];
            state.loading = false;
        },
        addPost: (state: BlogState, action: PayloadAction<BlogPostModel>) => {
            state.loading = true;
        },
        removePost: (state: BlogState) => {

        },
        editPost: (state: BlogState) => {

        },
        callFailure: (state: BlogState) => {
            state.loading = false;
        },
    }
});

export const {
    fetchPosts,
    setPosts,
    addPost,
    removePost,
    editPost,
    callFailure
} = blogSlice.actions;

export default blogSlice.reducer;