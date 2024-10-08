import { TextInput, View } from "react-native";
import { Button } from "@rneui/base";
import EventFilterButton from "@/components/event/EventFilterButton";

export default function EventFilter({ tags, tagEvents }) {
  return (
    <View>
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {tags.map((tag: any) => (
          <EventFilterButton
            onPress={() => tagEvents(tag.name)}
            key={tag.id}
            title={tag.name}
          />
        ))}
      </View>
    </View>
  );
}
