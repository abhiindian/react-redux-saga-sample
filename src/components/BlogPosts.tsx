import { Backdrop, CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import AddPost from './AddPost'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import Post from './Post'
import { fetchPosts } from '../state/blogSlice'
import UpdatePostDialog from './UpdatePostDialog'
import { BlogPost } from '../types/BlogTypes'

export default function BlogPosts() {
    const { blogPosts, loading, selectedPost, openDialog } = useAppSelector((state: RootState) => state.blog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (<>
        <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={12}>
                <AddPost />
                {blogPosts && blogPosts.map((post) =>
                    <Post
                        key={post.id}
                        post={post}
                    />
                )}

            </Grid>
            <UpdatePostDialog
                openDialog={openDialog}
                selectedPost={selectedPost as BlogPost}
            />
        </Grid>
        <Backdrop open={loading}>
            <CircularProgress />
        </Backdrop>
    </>
    )
}
