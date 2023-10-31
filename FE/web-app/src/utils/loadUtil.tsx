// material-ui
import { CircularProgress, Dialog, Grid } from '@mui/material';
import React from "react";
import SubCard from "../ui-component/cards/SubCard";

interface LoaderProps {
    isLoading: boolean;
    setIsLoading: (s: boolean) => void;
}

const Load = ( { isLoading, setIsLoading }: LoaderProps) => {
    return (
        <Dialog onClose={() => {}} aria-labelledby="simple-dialog-title" open={isLoading}>
            {isLoading && (
                <Grid container justifyContent="center" alignItems="center" sx={{ padding: '2vh 2vw' }}>
                    <CircularProgress color="secondary" aria-label="progress with secondary color" />
                </Grid>
            )}
        </Dialog>
    )
}

export default Load;