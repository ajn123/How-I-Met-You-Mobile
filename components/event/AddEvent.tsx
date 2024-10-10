import axios from "axios";
import axiosUtil from "@/utils/axiosUtil";
import { Platform, TextInput, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { useState } from "react";

export default function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  function submit() {
    axiosUtil()
      .post("/events", {
        name: name,
        description: description,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View>
      <Text>Event Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Event Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Text>Event Description</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Event Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      {/*<Text>Event Date</Text>*/}
      {/*<TextInput*/}
      {/*  style={{*/}
      {/*    height: 40,*/}
      {/*    borderColor: "gray",*/}
      {/*    borderWidth: 1,*/}
      {/*    marginBottom: 10,*/}
      {/*  }}*/}
      {/*  placeholder="Event Date"*/}
      {/*  onChangeText={(text) => setDate(text)}*/}
      {/*  value={date}*/}
      {/*/>*/}

      {/*<Text>Event Location</Text>*/}
      {/*<TextInput*/}
      {/*  style={{*/}
      {/*    height: 40,*/}
      {/*    borderColor: "gray",*/}
      {/*    borderWidth: 1,*/}
      {/*    marginBottom: 10,*/}
      {/*  }}*/}
      {/*  placeholder="Event Location"*/}
      {/*  onChangeText={(text) => setLocation(text)}*/}
      {/*  value={location}*/}
      {/*/>*/}

      <Button title="Submit" onPress={submit} />
    </View>
  );
}
