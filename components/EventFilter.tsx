import { TextInput, View } from "react-native";
import { Button } from "@rneui/base";
import EventFilterButton from "@/components/event/EventFilterButton";

export default function EventFilter({ tags, filterTags, tagEvents }) {
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
            onPress={tagEvents}
            filterTags={filterTags}
            key={tag.id}
            tags={tags}
            title={tag.name}
          />
        ))}
        <EventFilterButton
          onPress={() => tagEvents("")}
          buttonStyle={{ backgroundColor: "red" }}
          filterTags={filterTags}
          tags={tags}
          title="Clear"
        />
      </View>
    </View>
  );
}
