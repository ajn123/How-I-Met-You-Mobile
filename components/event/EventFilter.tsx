import { ScrollView, TextInput, View } from "react-native";
import { Button } from "@rneui/base";
import EventFilterButton from "@/components/event/EventFilterButton";

export default function EventFilter({ tags, filterTags, tagEvents }) {
  return (
    <View>
      <ScrollView
        style={{
          gap: 8,
          margin: 5,
        }}
      >
        <EventFilterButton
          onPress={() => tagEvents("")}
          filterTags={filterTags}
          tags={tags}
          title="Clear Filter"
        />
        {tags.map((tag: any) => (
          <EventFilterButton
            onPress={tagEvents}
            filterTags={filterTags}
            key={tag.id}
            tags={tags}
            title={tag.name}
          />
        ))}
      </ScrollView>
    </View>
  );
}
