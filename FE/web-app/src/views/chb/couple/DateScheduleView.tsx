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
        <Typography variant="body2">
            THIS IS DATE SCHEDULE VIEW!!!!!!!!!
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography>
    </MainCard>
);

export default SamplePage;
