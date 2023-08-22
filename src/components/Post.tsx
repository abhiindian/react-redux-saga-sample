import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import React from 'react'
import { BlogPost } from '../types/BlogTypes'

type PostProps = {
    post: BlogPost
}

export default function Post({ post }: PostProps) {

    const handleOpen = (post: BlogPost) => {

    }

    const handleDelete = (postId: number) => {

    }

    return (
        <Card style={{
            width: 400,
            margin: 2
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
                <Button onClick={() => handleOpen(post)} size="small">Edit</Button>
                {" "}
                <Button onClick={() => handleDelete(post.id)} size="small">Delete</Button>
            </CardActions>
        </Card>
    )
}