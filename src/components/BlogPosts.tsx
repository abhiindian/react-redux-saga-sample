import { Grid } from '@mui/material'
import React from 'react'
import AddPost from './AddPost'

export default function BlogPosts() {

    return (
        <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={12}>
                <AddPost />
                {/*  {posts && posts.map((post) =>
                    <Post
                        key={post.id}
                        post={post}
                        handleOpen={handleOpenDialog}
                        handleDelete={handleDeletePost}
                    />
                )} */}

            </Grid>
            {/* <UpdatePostDialog
                openDialog={openDialog}
                handleClose={handleCloseDialog}
                handleSave={handleSavePost}
                handlePostChange={handleOpenDialogPostChange}
            /> */}
        </Grid>
    )
}
