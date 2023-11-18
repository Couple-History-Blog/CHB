import "./calendar-style.scss";
// import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import React, { useCallback, useMemo, useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    differenceInCalendarDays,
    getMonth,
    isSaturday,
    isSunday,
} from "date-fns";
import {
    farRightArrow as rightArrowIcon,
    farLeftArrow as leftArrowIcon,
} from 'utils/font-awesome/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DateCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weekMock = ["일", "월", "화", "수", "목", "금", "토"];
    const nextMonthHandler = useCallback(() => {
        setCurrentDate(addMonths(currentDate, 1));
    }, [currentDate]);
    const prevMonthHandler = useCallback(() => {
        setCurrentDate(subMonths(currentDate, 1));
    }, [currentDate]);
    const createMonth = useMemo(() => {
        const monthArray = [];
        let day = startDate;
        while (differenceInCalendarDays(endDate, day) >= 0) {
            monthArray.push(day);
            day = addDays(day, 1);
        }
        return monthArray;
    }, [startDate, endDate]);


    const setBorderWidth = (isToday: boolean) => {
        let borderWidth = "1px";
        if (isToday) borderWidth = "4px";

        return borderWidth;
    }
    const setWeekendFontColor = (validation: boolean, date: Date) => {
        let fontColor;
        if (isSunday(date)) fontColor = "red"
        else if (isSaturday(date)) fontColor = "blue"

        return fontColor;
    }

    return (
        <section className={"calendar"}>
            <div className={"yearTitle"}>{format(currentDate, "yyyy년")}</div>
            <div className={"monthTitle"}>
                <button className={"prevButton"} onClick={prevMonthHandler}>
                    <FontAwesomeIcon icon={ leftArrowIcon } />
                </button>
                <div className={"month"}>{format(currentDate, "M월")}</div>
                <button className={"nextButton"} onClick={nextMonthHandler}>
                    <FontAwesomeIcon icon={ rightArrowIcon } />
                </button>
            </div>
            <div className={"dayContainer"}>
                {weekMock.map((v, i) => {
                    let style;
                    if (i === 0) {
                        style = {
                            color: "red",
                        };
                    } else if (i === 6) {
                        style = {
                            color: "blue",
                        };
                    }

                    return (
                        <div key={`day${i}`} style={style}>
                            {v}
                        </div>
                    );
                })}
            </div>
            <div className={`dateContainer`}>
                {createMonth.map((v, i) => {
                    const validation = getMonth(currentDate) === getMonth(v);
                    const today = format(new Date(), "yyyyMMdd") === format(v, "yyyyMMdd");
                    const style = {
                        borderWidth: setBorderWidth(today),
                        color: setWeekendFontColor(validation, v),
                    }
                    return (
                        <div
                            key={`date${i}`}
                            className={validation ? "currentMonth hover-color" : "diffMonth hover-color"}
                            style={ style }
                        >
                            <div className={"topLine"}>
                                <span className={"day"}>{format(v, "d")}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DateCalendar;