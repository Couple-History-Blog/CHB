import { useTheme } from '@mui/material/styles';
import {IconButton, Paper, TextField, TextFieldProps, Typography} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent, TimelineDot
} from '@mui/lab';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {
    fasCircleArrowDown as circleArrowDownIcon,
    farCirclePlus as circlePlusIcon,
    farCircleMinus as circleMinusIcon
} from "utils/font-awesome/icons";
import "./schedule-style.scss";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


interface TimelineItem {
    time: Date;
    title: string;
    description: string;
}

export default function ScheduleTimeline() {

    const [timelineTotalIndex, setTimelineTotalIndex] = useState(0);
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
        {
            time: new Date(2000, 0, 1, 9, 30),
            title: '',
            description: '',
        },
    ]);

    const [hoveredItems, setHoveredItems] = useState<boolean[]>(Array(timelineItems.length).fill(false));

    const theme = useTheme();
    const paper = {
        p: 2.5,
        boxShadow: 'none',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        border: '1px dashed',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.dark
    };

    const deleteTimelineItem = (index: number) => {
        setTimelineTotalIndex(timelineTotalIndex - 1);
        setTimelineItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });

        setHoveredItems((prevHovered) => {
            const updatedHovered = [...prevHovered];
            updatedHovered.splice(index, 1);
            return updatedHovered;
        });
    };

    const addNewTimeline = () => {
        const newTimelineIndex = timelineTotalIndex + 1;
        setTimelineTotalIndex(newTimelineIndex);
        const newTimelineItem = {
            time: new Date(2000, 0, 1, 9, 30),
            title: '' + newTimelineIndex,
            description: '',
        };

        setTimelineItems((prevItems) => [...prevItems, newTimelineItem]);
        setHoveredItems((prevHovered) => [...prevHovered, false]);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredItems((prevHovered) => {
            const updatedHovered = [...prevHovered];
            updatedHovered[index] = true;
            return updatedHovered;
        });
    };

    const handleMouseLeave = (index: number) => {
        setHoveredItems((prevHovered) => {
            const updatedHovered = [...prevHovered];
            updatedHovered[index] = false;
            return updatedHovered;
        });
    };

    const updateTimelineItem = (index: number, field: keyof TimelineItem, value: any) => {
        setTimelineItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index][field] = value;
            return updatedItems;
        });
    };

    return (
        <Timeline position="alternate">
            {timelineItems.map((item, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            orientation="landscape"
                            value={item.time}
                            onChange={(date) => updateTimelineItem(index, 'time', date)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="시간"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                            views={['hours', 'minutes', "seconds"]}
                            ampm
                            mask="__:__ _M"
                        />
                        </LocalizationProvider>
                    </TimelineOppositeContent>
                    <TimelineSeparator
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        style={{ height: '24px', display: 'grid', placeItems: 'center' }}
                    >
                        <TimelineDot color="secondary" className={`timeline-delete-dot-hover-color ${hoveredItems[index] ? 'hovered' : ''}`}>
                            <FontAwesomeIcon
                                className='timeline-dot'
                                icon={hoveredItems[index] ? circleMinusIcon : circleArrowDownIcon}
                                onClick={() => deleteTimelineItem(index)}
                            />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} sx={paper}>
                            <TextField
                                placeholder="제목"
                                variant="standard"
                                value={item.title}
                                onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                            />
                            <TextField
                                placeholder="내용"
                                variant="standard"
                                multiline
                                rows={4}
                                value={item.description}
                                onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                            />
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            ))}

            <TimelineSeparator
                style={{ height: '24px', display: 'grid', placeItems: 'center' }}>
                <TimelineDot color="secondary" className='timeline-dot-hover-color'>
                    <FontAwesomeIcon
                        onClick={() => addNewTimeline()}
                        className='timeline-dot'
                        icon={circlePlusIcon}
                    />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
        </Timeline>
    );
}
