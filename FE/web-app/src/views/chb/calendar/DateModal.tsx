import React from "react";
import {Grid, IconButton, Link, Modal, Paper, Typography} from "@mui/material";
import "./calendar-style.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fasXmark as closeIcon} from "../../../utils/font-awesome/icons";
import SubCard from "../../../ui-component/cards/SubCard";
import CustomizedTimeline from "../../ui-elements/advance/UITimeline/CustomizedTimeline";
import ScheduleTimeline from "../schedule/ScheduleTimeline";

interface DateModalProps {
    isModalOpen: boolean;
    updateIsModalOpen: (isOpen: boolean) => void;
}

const scrollableContainerStyles: React.CSSProperties = {
    width: "100%",
    height: "80%", // 원하는 높이로 설정
    overflowY: "auto", // 세로 스크롤 활성화
};

const DateModal: React.FC<DateModalProps> = ({isModalOpen, updateIsModalOpen}) => {

    return (
        <Modal
            open={isModalOpen}
            onClose={() => updateIsModalOpen(false)}
        >
            <Grid className='date-modal'>
                <FontAwesomeIcon
                    style={{zIndex: '20', marginTop: '3%'}}
                    className='close-btn'
                    icon={closeIcon}
                    onClick={() => updateIsModalOpen(false)}
                    size="2xl"
                />
                <Grid style={scrollableContainerStyles}>
                    <ScheduleTimeline />
                </Grid>
            </Grid>
        </Modal>
    );
}

export default DateModal;
