import React from "react";
import utc from 'dayjs/plugin/utc';
import dayjs, { Dayjs } from "dayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import classes from "./CustomDatePicker.module.scss";
import { ICustomDatePickerProps } from "./CustomDatePicker.props";
import { ActionsPanel } from "../ActionsPanel";

dayjs.extend(utc)

export const CustomDatePicker: React.FC<ICustomDatePickerProps> = ({ onChange, value, availableDates }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        setOpen(false);
    }, [value]);

    const onCloseDatePicker = (): void => {
        setOpen(false);
    };

    const onOpenDatePicker = (): void => {
        setOpen(true);
    };

    const handleChange = (value: any) => {
        onChange(value);
    };

    const shouldDisableDate = (date: Dayjs) => {
        if(!availableDates) {
            return false
        }

        console.log(date.utc().format())

        return !availableDates.includes(date.utc().format().split('T')[0])
    }

    return (
        <div className={classes.wrapper} onClick={onOpenDatePicker}>
            <DesktopDatePicker
                // minDate={new Date()}
                shouldDisableDate={shouldDisableDate}
                disablePast
                inputFormat="DD/MM/YYYY"
                onClose={onCloseDatePicker}
                value={value}
                onChange={handleChange}
                open={open}
                components={{ PaperContent: ActionsPanel }}
                componentsProps={{ paperContent: { onChangeDate: handleChange } }}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        sx={{ background: "#fff", borderRadius: "4px" }}
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            placeholder: "Дата",
                        }}
                    />
                )}
            />
        </div>
    );
};
