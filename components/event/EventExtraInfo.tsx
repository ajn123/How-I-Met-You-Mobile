import { View } from "react-native";
import DateUtil from "@/utils/DateUtil";

export default function EventExtraInfo({ event }: any) {
  return (
    <View>
      <Text style={{ marginBottom: 5 }}>{event.name}</Text>
      <Text>{DateUtil(event.date)}</Text>
      <Text>{event.url}</Text>
      <Text>{event.description}</Text>
    </View>
  );
}
