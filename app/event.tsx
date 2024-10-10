import { Button, Text, View } from "react-native";
import DateUtil from "@/utils/DateUtil";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import EventBasicInfo from "@/components/event/EventBasicInfo";
import EventExtraInfo from "@/components/event/EventExtraInfo";

export default function Event() {
  const navigation = useNavigation();
  const event = navigation.getState()?.routes[1]?.params.event;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: event.name,
      headerBackTitle: "Back",
      headerRight: () => (
        <Button title={"Share"} onPress={() => alert("share")} />
      ),
    });
  }, []);

  return (
    <>
      <EventExtraInfo event={event} />
      <EventBasicInfo event={event} numberOfLines={100} />
    </>
  );
}
