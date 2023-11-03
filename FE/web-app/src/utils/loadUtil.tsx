// material-ui
import {Backdrop, CircularProgress, Dialog, Grid } from '@mui/material';
import React from "react";
import SubCard from "../ui-component/cards/SubCard";

interface LoaderProps {
    isLoading: boolean;
    setIsLoading: (s: boolean) => void;
}

const Load = ( { isLoading, setIsLoading }: LoaderProps) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Load;