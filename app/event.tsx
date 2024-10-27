import { Button, Image, Text, View } from "react-native";
import DateUtil from "@/utils/DateUtil";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import EventBasicInfo from "@/components/event/EventBasicInfo";
import EventExtraInfo from "@/components/event/EventExtraInfo";
import ParallaxScrollView from "@/components/ParallaxScrollView";

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
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: event.image_url }}
            defaultSource={require("@/assets/images/react-logo.png")}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        }
        headerBackgroundColor={"black"}
      >
        <View style={{ backgroundColor: "white" }}>

          <EventExtraInfo event={event} />
          <EventBasicInfo event={event} numberOfLines={100} />
        </View>
      </ParallaxScrollView>
    </View>
  );
}
