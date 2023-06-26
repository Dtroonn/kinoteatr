import React from "react";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import TextField from "@mui/material/TextField";

import classes from "./CustomStaticDatePicker.module.scss";
import { ICustomStaticDatePickerProps } from "./CustomStaticDatePicker.props";
import { ActionsPanel } from "../ActionsPanel";

export const CustomStaticDatePicker: React.FC<ICustomStaticDatePickerProps> = ({
    onChange,
    value,
}) => {
    return (
        <div className={classes.wrapper}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                minDate={new Date()}
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={onChange}
                components={{ PaperContent: ActionsPanel }}
                componentsProps={{ paperContent: { onChangeDate: onChange } }}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    );
};
