import { TextInput, View } from "react-native";
import { Button } from "@rneui/base";

export default function EventFilter({ onFilter, tags, tagEvents }) {
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
          <Button
            onPress={() => tagEvents(tag.name)}
            style={{ backgroundColor: tag.color, margin: 2 }}
            key={tag.id}
            title={tag.name}
          />
        ))}
      </View>
    </View>
  );
}
