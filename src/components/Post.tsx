import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import React from 'react'
import { BlogPost } from '../types/BlogTypes'
import { useAppDispatch } from '../app/hooks'
import { removePost, setSelectedPost } from '../state/blogSlice'

type PostProps = {
    post: BlogPost
}

export default function Post({ post }: PostProps) {
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        dispatch(setSelectedPost(post));
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete the post?')) {
            dispatch(removePost(post));
        }
    }

    return (
        <Card style={{
            width: 400,
            marginBottom: '12px'
        }}>
            <CardContent>
                <Typography style={{
                    fontSize: 18,
                    fontWeight: 'bold'
                }} color="primary" gutterBottom>
                    {post.title}
                </Typography>
                <Typography style={{ fontSize: 16 }} color="textSecondary" gutterBottom>
                    {post.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleOpen} size="small">Edit</Button>
                {" "}
                <Button onClick={handleDelete} size="small">Delete</Button>
            </CardActions>
        </Card>
    )
}