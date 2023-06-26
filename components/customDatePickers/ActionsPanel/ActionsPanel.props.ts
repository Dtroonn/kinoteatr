import { Dayjs } from "dayjs";

export interface ActionsPanelProps {
    children: React.ReactNode;
    onChangeDate: (value: Dayjs | null) => void;
}
