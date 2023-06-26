import { ICustomStaticDatePickerProps } from "components/customDatePickers/CustomStaticDatePicker/CustomStaticDatePicker.props";

export interface IScheduleDatePickerProps {
    onChange: ICustomStaticDatePickerProps["onChange"];
    value: ICustomStaticDatePickerProps["value"];
    className?: string;
}
