import { FC } from "react";
import dayjs from "dayjs";
import { Input, InputProps } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface IDatepickerProps extends Omit<InputProps, "value" | "onChange"> {
  value: string;
  onChange: (date: Date | null) => void;
}

export const Datepicker: FC<IDatepickerProps> = ({ value, onChange, ...props }) => {
  return (
    <DatePicker
      dateFormat="yyyy-MM-dd"
      selected={dayjs(value).toDate()}
      onChange={onChange}
      customInput={<Input readOnly {...props} />}
    />
  );
};
