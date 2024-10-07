import {FlatList, Text, View} from "react-native";
import axios from "axios";

import { StyleSheet, Image, Platform } from 'react-native';
import EventList from "@/components/EventList";
import {Drawer} from "react-native-drawer-layout";
import {useEffect, useState} from "react";

// @ts-ignore
export default function Index() {
    const [open, setOpen] = useState(false);
  return (
      <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderDrawerContent={() => {
              return <Text>Drawer content</Text>;
          }}
      >
        <EventList/>
        </Drawer>
  );
}
const styles =   StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 0,
    },
    item: {
        color: "slategrey",
        backgroundColor: "ghostwhite",
        textAlign: "center",
    },
});