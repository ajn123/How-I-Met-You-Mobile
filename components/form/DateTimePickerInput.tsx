import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimePickerInput({ date, setDate }) {
  return (
    <>
      <DateTimePicker
        value={date}
        mode="datetime"
        is24Hour={false}
        onChange={(event, selectedDate) => {
          setDate(selectedDate);
        }}
      />
    </>
  );
}
