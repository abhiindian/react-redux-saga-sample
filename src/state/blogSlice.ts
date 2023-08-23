import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogPost, BlogPostModel } from "../types/BlogTypes";


export interface BlogState {
    blogPosts: Array<BlogPost>;
    loading: boolean;
    selectedPost: BlogPost | null;
    openDialog: boolean;
}

const initialState: BlogState = {
    blogPosts: [],
    loading: false,
    selectedPost: null,
    openDialog: false
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
            state.openDialog = false;
        },
        addPost: (state: BlogState, action: PayloadAction<BlogPostModel>) => {
            state.loading = true;
        },
        removePost: (state: BlogState, action: PayloadAction<BlogPost>) => {
            state.loading = true;
        },
        setSelectedPost: (state: BlogState, action: PayloadAction<BlogPost>) => {
            state.selectedPost = action.payload;
            state.openDialog = true;
        },
        editPost: (state: BlogState, action: PayloadAction<BlogPost>) => {
            state.loading = true;
        },
        closeDialogModal: (state: BlogState) => {
            state.openDialog = false;
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
    setSelectedPost,
    closeDialogModal,
    callFailure
} = blogSlice.actions;

export default blogSlice.reducer;