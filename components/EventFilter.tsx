import { Button, TextInput, View } from "react-native";

export default function EventFilter({ onFilter, tags, tagEvents }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        {tags.map((tag: any) => (
          <Button
            onPress={() => tagEvents(tag.name)}
            style={{ borderColor: "black", borderWidth: 1 }}
            key={tag.id}
            title={tag.name}
          />
        ))}
      </View>

      <TextInput
        style={{
          height: 30,
          borderColor: "gray",
          borderWidth: 1,
          marginHorizontal: 2,
          marginTop: 0,
          marginBottom: 10,
        }}
        autoFocus={true}
        placeholder="Search..."
        onChangeText={onFilter}
      />
    </View>
  );
}
