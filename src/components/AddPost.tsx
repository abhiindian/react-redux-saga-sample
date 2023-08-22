import { TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../app/hooks';
import { addPost } from '../state/blogSlice';

export default function AddPost() {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleAddPost = () => {
        dispatch(addPost({
            body,
            title,
            userId: 1
        }));
        setTitle('');
        setBody('')
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleBody = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }

    return (
        <div style={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <TextField
                fullWidth
                value={title}
                onChange={handleTitle}
                label='Title'
            />
            <br />
            <TextField
                fullWidth
                value={body}
                onChange={handleBody}
                label='Body'
            />
            <br />
            <Button
                disabled={title === '' || body === ''}
                onClick={handleAddPost}
            >
                Add
            </Button>
        </div>
    )
}