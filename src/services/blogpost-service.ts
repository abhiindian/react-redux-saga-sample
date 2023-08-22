import axios from "axios";

import { baseAxiosInstance } from "./interceptors/axios-inceptors";
import { BlogPost, BlogPostModel } from "../types/BlogTypes";

const uri = `https://jsonplaceholder.typicode.com/posts`;

export const cancelToken = axios.CancelToken.source();

export const getBlogPosts = async () => {
    const requestUrl = new URL(`${uri}`);
    requestUrl.searchParams.append('_start', '95');
    requestUrl.searchParams.append('_limit', '100');
    const response = await baseAxiosInstance.get(requestUrl.toString());
    const res = await response.data.data;
    return res;
};

export const postBlogPost = async (blogPost: BlogPostModel) => {
    const requestUrl = new URL(`${uri}`);
    const response = await baseAxiosInstance.post(requestUrl.toString(), blogPost);
    const res = await response.data.data;
    return res;
};

export const putBlogPost = async (blogPost: BlogPost) => {
    const requestUrl = new URL(`${uri}`);
    const response = await baseAxiosInstance.put(requestUrl.toString(), blogPost);
    const res = await response.data.data;
    return res;
};

export const deleteBlogPost = async (id: number) => {
    const requestUrl = new URL(`${uri}/id`);
    const response = await baseAxiosInstance.delete(requestUrl.toString());
    const res = await response.data.data;
    return res;
};
