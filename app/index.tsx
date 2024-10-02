import {FlatList, Text, View} from "react-native";
import axios from "axios";
import {useState} from "react";

import { StyleSheet, Image, Platform } from 'react-native';

export default function Index() {
    const [tags, setTags] = useState([]);

    axios.get(`http://localhost/api/events`).then((response) => {
        setTags(response.data);
    })

  return (
    <View
      style={styles.container}
    >
        <FlatList data={tags} renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>} />
    </View>
  );
}


const styles =   StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 40,
    },
    item: {
        margin: 5,
        padding: 5,
        color: "slategrey",
        backgroundColor: "ghostwhite",
        textAlign: "center",
    },
});