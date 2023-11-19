// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import React from "react";
import DateCalendar from "../calendar/DateCalendar";

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="DATE-SCHEDULE">
        <DateCalendar />
    </MainCard>
);

export default SamplePage;
