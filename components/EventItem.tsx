import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import DateUtil from "@/utils/DateUtil";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import EventBasicInfo from "@/components/event/EventBasicInfo";

type Event = {
  name: string;
  id: number;
  date: string;
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 5,
    color: "slategrey",
    backgroundColor: "ghostwhite",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default function EventItem({ event }: any) {
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      <EventBasicInfo
        event={event}
        moreInfo={() => {
          navigation.navigate("event", { event: event });
        }}
      />
    </View>
  );
}
