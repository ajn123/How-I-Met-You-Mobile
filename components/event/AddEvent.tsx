import axios from "axios";
import axiosUtil from "@/utils/AxiosUtil";
import {
  Platform,
  TextInput,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Button, Divider, Icon, Overlay } from "@rneui/base";
import { useState } from "react";
import DateTimePickerInput from "@/components/form/DateTimePickerInput";
import Toast from "react-native-root-toast";
import { ThemedText } from "@/components/ThemedText";
import * as ImagePicker from "expo-image-picker";
import AxiosUtil from "@/utils/AxiosUtil";
import * as ImageManipulator from 'expo-image-manipulator';

export default function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");

  const [image, setImage] = useState(null);

  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  async function submit() {
    let data = {
      name: name,
      description: description,
      date: date,
    };

    if (url) {
      data["url"] = url;
    }

    if (location !== "") {
      data["location"] = location;
    }

    if (image) {
      console.log("image");

      const manipResult = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 600, height: 600 } }], // Resize to 800x600
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG } // Compress and set format
      );

      const formData = new FormData();

      console.log(manipResult);
      console.log(manipResult.uri);

      formData.append("image", {
        uri: manipResult.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      try {
        let response = await axiosUtil()
          .post("/events/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        console.log(response.data.url);
        console.log("SUBMITTED IMAGE");
        data["image_url"] = response.data.url;

      } catch (err) {
        console.log("axios error", err); // TODO: icon
      }
    } else {
      console.log("no image");
    }

    console.log(data);

    AxiosUtil()
      .post("/events", data)
      .then((resp) => {
        // console.log(resp);
        console.log("SUBMITTED EVENT");

        let toast = Toast.show("Successfully Submitted event", {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
        setName("");
        setDescription("");
        setUrl("");
        setLocation("");

        setImage(null);
      })
      .catch((err) => {
        console.log("axios error", err.response.data.message); // TODO: icon
        let toast = Toast.show(err.response.data.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      });
  }

  return (
    <>
      <ScrollView style={{ margin: 5 }}>
        <ThemedText
          style={{
            margin: 3,
            fontSize: 16,
            textAlign: "center",
            borderRadius: 5,
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
          }}
          type={"subtitle"}
        >
          Submit an event here - if it's approved it will be listed. If you
          don't know all the info i'll clean it up on my side :)
        </ThemedText>
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

        <Text>Event Location</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          placeholder="Location"
          onChangeText={(text) => setLocation(text)}
          value={location}
        />

        <Text>Event Date</Text>
        <DateTimePickerInput date={date} setDate={setDate} />

        <Text>Event URL (Optional)</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          placeholder="http://"
          onChangeText={(text) => setUrl(text)}
          value={url}
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

        {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 200, width: "flex" }}
          />
        )}

        <Button
          title="Pick Image (Optional)"
          buttonStyle={{ marginTop: 10, borderRadius: 5 }}
          style={{ marginTop: 10 }}
          onPress={pickImage}
        />

        <Button
          title="Submit"
          buttonStyle={{
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: "green",
          }}
          onPress={submit}
        />
      </ScrollView>
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
          buttonStyle={{ marginTop: 10 }}
          style={{ marginTop: 10 }}
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
