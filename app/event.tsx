import { Text, View } from "react-native";
import DateUtil from "@/utils/DateUtil";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function Event() {
  const navigation = useNavigation();
  const event = navigation.getState()?.routes[1]?.params.event;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: event.name,
    });
  }, []);

  return (
    <View style={{}}>
      <Text style={{ marginBottom: 5 }}>{event.name}</Text>
      <Text>{DateUtil(event.date)}</Text>
      <Text>{event.url}</Text>
      <Text>{event.description}</Text>
    </View>
  );
}
