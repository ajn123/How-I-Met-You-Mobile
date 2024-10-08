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
import { SearchBar } from "@rneui/base";

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
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  let isRefreshing: boolean = false;

  const maxPages = useRef(Number.POSITIVE_INFINITY);
  let page = useRef(1);

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

    if (search) {
      finalParams["searchName"] = search;
    }

    console.log(finalParams);

    const urlSearchParams = new URLSearchParams(finalParams);

    console.log(`/api/events?${urlSearchParams.toString()}`);

    axiosUtil()
      .get(`/events?${urlSearchParams.toString()}`)
      .then((response) => {
        maxPages.current = response.data.last_page;
        if (getMore) {
          console.log("adding on");
          setEvents((prev) => [...prev, ...response.data.data]);
        } else {
          console.log("replacing");
          setEvents(response.data.data);
        }
        page.current++;
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    getMoreEvents(false);
  }, [search]);

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
      <View style={styles.container}>
        <SearchBar
          placeholder="Search..."
          round
          onChangeText={(text) => {
            console.log(text);
            setSearch(text);
            getMoreEvents(false);
          }}
          onClear={() => {
            setSearch("");
          }}
          onCancel={() => {
            setSearch("");
          }}
          value={search}
          containerStyle={{ backgroundColor: "white" }}
        />
        <FlatList
          data={events}
          onEndReached={getMoreEvents}
          onRefresh={refreshEvents}
          refreshing={isRefreshing}
          renderItem={({ item }) => (
            <View key={item.id}>
              <EventItem event={item} />
            </View>
          )}
        />
      </View>
    </Drawer>
  );
}
