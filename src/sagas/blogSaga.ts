import { call, put, select, takeLatest } from "redux-saga/effects";
import { addPost, callFailure, editPost, fetchPosts, removePost, setPosts } from "../state/blogSlice";
import { BlogPost, BlogPostModel } from "../types/BlogTypes";
import { deleteBlogPost, getBlogPosts, postBlogPost, putBlogPost } from "../services/blogpost-service";
import { RootState, store } from "../app/store";
import { showSnackbarMessage } from "../state/snackbarSlice";
import { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

//Selector

const getBlogState = (state: RootState) => state.blog;

//Sagas

export function* fetchPostsSaga() {
    yield takeLatest(fetchPosts.type, handlefetchPosts);
}

export function* addPostSaga() {
    yield takeLatest(addPost.type, handleAddPost);
}

export function* editPostSaga() {
    yield takeLatest(editPost.type, handleEditPost);
}

export function* removePostSaga() {
    yield takeLatest(removePost.type, handleRemovePost);
}

//Handlers

function* handlefetchPosts() {
    try {
        const response: AxiosResponse<Array<BlogPost>> = yield call(getBlogPosts);
        // appInsights.trackTrace({ message: "Handle get asset by type saga", severityLevel: SeverityLevel.Information }, { page: "assets", function: "handleGetAssetsByType", payload: action.payload });
        yield put(setPosts(response.data));
    } catch (err: any) {
        handleError(err, `Error fetching blog post`, (errorMessage: string) => {
            const { dispatch } = store;
            dispatch(callFailure());
            // appInsights.trackException({ exception: err, properties: { name: "Handle get blog post saga error", function: "handleGetAssetMasters" } });
        });

    }
}

function* handleAddPost(action: PayloadAction<BlogPostModel>) {
    try {
        const response: AxiosResponse<BlogPost> = yield call(postBlogPost, action.payload);
        const { blogPosts } = yield select(getBlogState);
        // appInsights.trackTrace({ message: "Handle get asset by type saga", severityLevel: SeverityLevel.Information }, { page: "assets", function: "handleGetAssetsByType", payload: action.payload });
        yield put(setPosts([...blogPosts, response.data]));
    } catch (err: any) {
        handleError(err, `Error adding blog post`, (errorMessage: string) => {
            const { dispatch } = store;
            dispatch(callFailure());
            // appInsights.trackException({ exception: err, properties: { name: "Handle get asset master saga error", function: "handleGetAssetMasters" } });
        });

    }
}


function* handleEditPost(action: PayloadAction<BlogPost>) {
    try {
        const response: AxiosResponse<BlogPost> = yield call(putBlogPost, action.payload);
        const { blogPosts } = yield select(getBlogState);
        // appInsights.trackTrace({ message: "Handle get asset by type saga", severityLevel: SeverityLevel.Information }, { page: "assets", function: "handleGetAssetsByType", payload: action.payload });

        const index = (blogPosts as Array<BlogPost>).findIndex((blogPost: BlogPost) => blogPost.id === action.payload.id);
        const updatedBlogPosts = blogPosts.map((blogPost: BlogPost, i: number) => {
            if (i === index) {
                return { ...blogPost, ...response.data };
            }
            return blogPost;
        })
        yield put(setPosts(updatedBlogPosts));
    } catch (err: any) {
        handleError(err, `Error editing blog post`, (errorMessage: string) => {
            const { dispatch } = store;
            dispatch(callFailure());
            // appInsights.trackException({ exception: err, properties: { name: "Handle get asset master saga error", function: "handleGetAssetMasters" } });
        });

    }
}

function* handleRemovePost(action: PayloadAction<BlogPost>) {
    try {
        yield call(deleteBlogPost, action.payload.id);
        const { blogPosts } = yield select(getBlogState);
        // appInsights.trackTrace({ message: "Handle get asset by type saga", severityLevel: SeverityLevel.Information }, { page: "assets", function: "handleGetAssetsByType", payload: action.payload });

        const updatedBlogPosts = (blogPosts as Array<BlogPost>).filter((blogPost: BlogPost) => blogPost.id !== action.payload.id);

        yield put(setPosts(updatedBlogPosts));
    } catch (err: any) {
        handleError(err, `Error editing blog post`, (errorMessage: string) => {
            const { dispatch } = store;
            dispatch(callFailure());
            // appInsights.trackException({ exception: err, properties: { name: "Handle get asset master saga error", function: "handleGetAssetMasters" } });
        });

    }
}

// Error Handling

function handleError(err: any, alternateErrorMessage: string, fnCall?: any) {
    const { dispatch } = store;
    if (window.navigator.onLine && err) {
        let error: string[] = err?.response?.data?.messages;
        let errorMessage = error?.length > 0 ? error.join() : alternateErrorMessage;
        if (fnCall) {
            fnCall(errorMessage);
        }
        dispatch(showSnackbarMessage({ message: errorMessage, severity: "error" }));
    } else {
        dispatch(showSnackbarMessage({ message: "Network Error", severity: "error" }));
    }
}