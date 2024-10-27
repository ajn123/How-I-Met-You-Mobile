import DateUtil from "@/utils/DateUtil";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Button, Chip, Icon } from "@rneui/base";
const styles = StyleSheet.create({
  eventName: {
    margin: 5,
    paddingTop: 8,
    bold: true,
    fontSize: 24,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 16,
    color: "slategrey",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    margin: 5,
  },
  eventUrl: {
    fontSize: 16,
    color: "black",
    borderColor: "#ff4d4d",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    margin: 4,
  },
  eventDescription: {
    margin: 5,
    fontSize: 16,
  },
});

export default function EventBasicInfo({
  event,
  moreInfo = undefined,
  numberOfLines = 2,
}: any) {
  return (
    <>
      <View style={{ margin: 2 }} onTouchStart={() => moreInfo && moreInfo()}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.eventName}>{event.name}</Text>
        </View>
        <Chip
          style={{ margin: 5 }}
          icon={
            <Icon
              name="edit-calendar"
              style={{ marginRight: 15 }}
              size={25}
              color="white"
            />
          }
          onPress={() => {
            const dateString = DateUtil(event.date, event.timezone, "numeric");
            console.log(dateString);
            const [date, time] = dateString.split(" ");
            const [month, day, year] = date.split("/");
            const [hour, minute] = time.split(":");
            Linking.openURL(
              `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
                event.name,
              )}&dates=${year +
              (month.length < 2 ? "0" + month : month) +
              (day.length < 2 ? "0" + day : day) +
              "T" +
              hour +
              (minute.length < 2 ? "0" + minute : minute) +
              "00" +
              (event.timezone ? `/${event.timezone}` : "")
              }`,
            );
          }}
        >
          {DateUtil(event.date)}
        </Chip>
        {event.locations &&
          event.locations.map((location: any) => {
            return (
              <Chip
                key={location.id}
                icon={
                  <Icon
                    name="location-pin"
                    style={{ marginRight: 15, marginTop: 0 }}
                    size={25}
                    color="white"
                  />
                }
                buttonStyle={{ backgroundColor: "#7b5dec" }}
                style={{ margin: 5 }}
                onPress={() => {
                  Linking.openURL(
                    `https://maps.google.com/?q=${location.name}`,
                  );
                }}
              >
                {location.name}
              </Chip>
            );
          })}

        <Text
          style={styles.eventDescription}
          numberOfLines={numberOfLines ?? 100}
          ellipsizeMode="tail"
        >
          {event.description}
        </Text>
      </View>
    </>
  );
}
