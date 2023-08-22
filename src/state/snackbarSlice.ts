import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export interface MessagePayload {
    message: string;
    severity?: AlertColor;
    action?: React.ReactNode;
}

export interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor | null;
    action: React.ReactNode | null;
}

const initialState: SnackbarState = {
    open: false,
    message: "",
    severity: "success",
    action: null,
};

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: initialState,
    reducers: {
        showSnackbarMessage: (state: SnackbarState, action: PayloadAction<MessagePayload>) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity ? action.payload.severity : null;
            state.action = action.payload.action ? action.payload.action : null;
            state.open = true;
            return state;
        },
        clearSnackbarMessage: (state: SnackbarState) => {
            state.open = false;
            return state;
        },
    },
});

export default snackbarSlice.reducer;
export const { showSnackbarMessage, clearSnackbarMessage } = snackbarSlice.actions;
