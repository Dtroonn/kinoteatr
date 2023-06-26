import Typography from "@mui/material/Typography";
import React from "react";

import classes from "./SessionInfo.module.scss";
import { ISessionInfoProps } from "./SessionInfo.props";
import dayjs from "dayjs";

export const SessionInfo: React.FC<ISessionInfoProps> = ({ time, hallNumber, price, hallType }) => {
    return (
        <div className={classes["session-info"]}>
            <div className={classes["session-info__time"]}>
                <Typography color="white" variant="body1">
                    {dayjs(time).format('HH:mm')}
                </Typography>
            </div>
            <Typography color="white" variant="body2">
                от {price} ₽
            </Typography>
            <Typography variant="body2" className={classes["session-info__hall-number"]}>
                Зал {hallNumber}
                {hallType && <Typography variant="body2">{hallType}</Typography>}
            </Typography>
        </div>
    );
};
