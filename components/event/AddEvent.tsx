import axios from "axios";
import axiosUtil from "@/utils/axiosUtil";
import { Platform, TextInput, Text, View } from "react-native";
import { Button, Icon, Overlay } from "@rneui/base";
import { useState } from "react";
import DateTimePickerInput from "@/components/form/DateTimePickerInput";
import { Toast } from "expo-router/build/views/Toast";

export default function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function submit() {
    axiosUtil()
      .post("/events", {
        name: name,
        description: description,
        date: date,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log("axios error", err.response.data); // TODO: icon

        setErrors(err.response.data.errors);
        toggleOverlay();
      });
  }

  return (
    <>
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

        <Text>Event Date</Text>
        <DateTimePickerInput date={date} setDate={setDate} />
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
      <Overlay
        isVisible={visible}
        style={{ backgroundColor: "white" }}
        onBackdropPress={toggleOverlay}
      >
        <Text>Errors</Text>
        <Text style={{ backgroundColor: "white" }}>{errors.date}</Text>

        <Text style={{ backgroundColor: "white" }}>{errors.name}</Text>
        <Text style={{ backgroundColor: "white" }}>{errors.description}</Text>

        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Noted"
          onPress={toggleOverlay}
        />
      </Overlay>
    </>
  );
}
