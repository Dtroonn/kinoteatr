import { Dayjs } from "dayjs";

export interface ICustomStaticDatePickerProps {
    onChange: (value: Dayjs | null, keyboardInputValue?: string | undefined) => void;
    value: null | Dayjs;
}
