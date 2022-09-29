import React from "react";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import classes from "./CustomDatePicker.module.scss";
import { ICustomDatePickerProps } from "./CustomDatePicker.props";
import { ActionsPanel } from "./ActionsPanel";

export const CustomDatePicker: React.FC<ICustomDatePickerProps> = ({ onChange, value }) => {
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

    return (
        <div className={classes.wrapper} onClick={onOpenDatePicker}>
            <DesktopDatePicker
                minDate={new Date()}
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
