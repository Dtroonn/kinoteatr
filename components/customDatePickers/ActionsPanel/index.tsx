import React from "react";
import Typography from "@mui/material/Typography";

import classes from "./ActionsPanel.module.scss";
import { ActionsPanelProps } from "./ActionsPanel.props";
import dayjs from "dayjs";

export const ActionsPanel: React.FC<ActionsPanelProps> = ({ children, onChangeDate }) => {
    const handleClickMoveToTodayBtn = () => {
        onChangeDate(dayjs());
    };

    const handleClickMoveToTommorowBtn = () => {
        onChangeDate(dayjs().add(1, "day"));
    };

    return (
        <div>
            <div className={classes.header}>
                <button onClick={handleClickMoveToTodayBtn} className={classes.header__btn}>
                    <Typography>Сегодня</Typography>
                </button>
                <button onClick={handleClickMoveToTommorowBtn} className={classes.header__btn}>
                    <Typography>Завтра</Typography>
                </button>
            </div>
            {children}
        </div>
    );
};
