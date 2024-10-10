import { Platform } from "react-native";

export default function DateTimePicker() {
  return (
    <>
      <Text>Event Time</Text>

      {Platform.OS === "ios" ? (
        <DatePicker
          style={{
            width: 320,
            height: 260,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          mode="time"
          date={new Date()}
          onDateChange={(date) => setDate(date.toLocaleTimeString())}
        />
      ) : (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedDate) =>
            setDate(selectedDate.toLocaleTimeString())
          }
        />
      )}
    </>
  );
}
