import {FlatList, Text, View} from "react-native";
import axios from "axios";
import {useEffect, useState} from "react";

import { StyleSheet, Image, Platform } from 'react-native';
import axiosUtil from "@/utils/axiosUtil";

export default function Index() {
    const [tags, setTags] = useState([]);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        axiosUtil().get(`/events`).then((response) => {
            setEvents(response.data.data);
        })
    }, []);

  return (
    <View
      style={styles.container}
    >
        <FlatList data={events} renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>} />
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