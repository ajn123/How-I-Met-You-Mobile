import {
  Button,
  FlatList,
  NativeScrollEvent,
  StyleSheet,
  View,
} from "react-native";
import EventItem from "@/components/EventItem";
import { useEffect, useRef, useState } from "react";
import axiosUtil from "@/utils/axiosUtil";
import EventFilter from "@/components/EventFilter";
import { useNavigation } from "@react-navigation/native";
import { Drawer } from "react-native-drawer-layout";

const styles = StyleSheet.create({
  container: {
    top: 0,
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

export default function EventList() {
  const [tags, setTags] = useState([]);
  const [events, setEvents] = useState([]);
  let page = useRef(1);
  const maxPages = useRef(Number.POSITIVE_INFINITY);

  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Events",
      headerLeft: () => (
        <Button
          onPress={() => setOpen((prevState) => !prevState)}
          title="Filter"
          color="#000"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getMoreEvents();

    axiosUtil()
      .get(`/tags`)
      .then((response) => {
        setTags(response.data);
      });
  }, []);

  function onFilter(filter: string) {
    axiosUtil()
      .get(`/events?searchName=${filter}`)
      .then((response) => {
        console.log(response);
        setEvents(response.data.data);
      });
  }

  // @ts-ignore
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = (event: NativeScrollEvent) => {
    if (isCloseToBottom(event)) {
      console.log(Date().toString());
    }
  };

  const getMoreEvents = (getMore = true) => {
    if (!getMore) {
      page.current = 1;
    }
    if (page.current > maxPages.current) {
      // TODO notification
      console.log("no more events");
      return;
    }

    const finalParams = {
      page: page.current,
    };

    console.log(finalParams);

    axiosUtil()
      .get(`/events?page=${page.current}`)
      .then((response) => {
        if (getMore) {
          setEvents((prev) => [...prev, ...response.data.data]);
        } else {
          setEvents(response.data.data);
        }
        page.current++;
        maxPages.current = response.data.lastPage;
      });
  };

  function tagEvents() {
    setEvents([]);
    page.current = 1;
    maxPages.current = Number.POSITIVE_INFINITY;
  }

  function refreshEvents() {
    getMoreEvents(false);
  }

  let isRefreshing: boolean = false;

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <EventFilter onFilter={onFilter} tags={tags} tagEvents={tagEvents} />
        );
      }}
    >
      <FlatList
        data={events}
        style={styles.container}
        //ListHeaderComponent={<EventFilter onFilter={onFilter} tags={tags} clearEvents={undefined} tagEvents={tagEvents}/>}
        ListHeaderComponentStyle={{
          position: "absolute",
          marginBottom: 4,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
        onEndReached={getMoreEvents}
        onRefresh={refreshEvents}
        refreshing={isRefreshing}
        renderItem={({ item }) => (
          <View key={item.id} style={{ top: 65 }}>
            <EventItem event={item} />
          </View>
        )}
      />
    </Drawer>
  );
}
