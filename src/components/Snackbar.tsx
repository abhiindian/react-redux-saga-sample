import React from 'react';
import { Snackbar, Alert, Slide, SlideProps, Grid, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { clearSnackbarMessage } from '../state/snackbarSlice';

function TransitionUp(props: JSX.IntrinsicAttributes & SlideProps) {
    return <Slide {...props} direction="up" />;
}

export default function SnackbarComponent() {

    const dispatch = useAppDispatch();
    const { open, message, severity, action } = useAppSelector((state: RootState) => state.snackbar);

    const handleClose = () => {
        dispatch(clearSnackbarMessage());
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={message}
            TransitionComponent={TransitionUp}
        >
            {severity ?
                <Alert severity={severity} sx={{ minWidth: '300px', backgroundColor: "#333333", color: "#FFFFFFDE", fontSize: "14px" }}>
                    {message}
                </Alert>
                :
                <Grid item container alignItems="center" style={{ border: "black" }} sx={{ padding: "16px", borderRadius: "5px", width: "358px", backgroundColor: "#333333", color: "#ffffff" }}>
                    <Grid xs={8}><Typography sx={{ fontSize: "14px" }}>{message}</Typography></Grid>
                    <Grid xs={4} container sx={{ justifyContent: "end" }}>
                        {action}
                    </Grid>
                </Grid>
            }
        </Snackbar>
    )
}