import { Dayjs } from "dayjs";

export interface ICustomDatePickerProps {
    onChange: (value: Dayjs | null, keyboardInputValue?: string | undefined) => void;
    value: null | Dayjs;
}