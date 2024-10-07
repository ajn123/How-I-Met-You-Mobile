import { Button, FlatList, Text, View } from "react-native";
import axios from "axios";

import { StyleSheet, Image, Platform } from "react-native";
import EventList from "@/components/EventList";
import { Drawer } from "react-native-drawer-layout";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import EventFilter from "@/components/EventFilter";

// @ts-ignore
export default function Index() {
  return <EventList />;
}
const styles = StyleSheet.create({
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
