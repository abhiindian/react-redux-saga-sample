import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BlogPost } from '../types/BlogTypes';
import { useAppDispatch } from '../app/hooks';
import { closeDialogModal, editPost } from '../state/blogSlice';

type UpdatePostDialogProps = {
    openDialog: boolean;
    selectedPost: BlogPost;
}

export default function UpdatePostDialog(updatePostDialogProps: UpdatePostDialogProps) {
    const { openDialog, selectedPost } = updatePostDialogProps;
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedPost) {
            setTitle(selectedPost.title);
            setBody(selectedPost.body);
        } else {
            setTitle('');
            setBody('');
        }
    }, [selectedPost]);

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleBody = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }

    const handleClose = () => {
        dispatch(closeDialogModal());
    }

    const handleSave = () => {
        dispatch(editPost({
            id: selectedPost?.id,
            userId: selectedPost?.userId,
            body,
            title
        }))
    }

    return (
        <div>
            <Dialog sx={{ minWidth: 500 }} open={openDialog} onClose={handleClose}>
                <DialogTitle>Update post</DialogTitle>
                <DialogContent>
                    <TextField
                        value={title}
                        onChange={handleTitle}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Post"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={body}
                        onChange={handleBody}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Post"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={title === '' || body === ''} onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}