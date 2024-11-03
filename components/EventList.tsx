import {
  Button,
  FlatList,
  NativeScrollEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import EventItem from "@/components/EventItem";
import { useEffect, useRef, useState } from "react";
import axiosUtil from "@/utils/AxiosUtil";
import EventFilter from "@/components/event/EventFilter";
import { useNavigation } from "@react-navigation/native";
import { Drawer } from "react-native-drawer-layout";
import { SearchBar } from "@rneui/base";
import AxiosUtil from "@/utils/AxiosUtil";

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
  const [filterTags, setFilterTags] = useState([]);

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

    AxiosUtil(false)
      .get(`/tags`)
      .then((response) => {
        setTags(response.data);
      });
  }, []);

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
      tags: filterTags,
    };

    if (search) {
      finalParams["searchName"] = search;
    }

    const urlSearchParams = new URLSearchParams(finalParams);

    // console.log(`/api/events?${urlSearchParams.toString()}`);

    AxiosUtil(false)
      .get(`/events?${urlSearchParams.toString()}`)
      .then((response) => {
        maxPages.current = response.data.last_page;
        if (getMore) {
          setEvents((prev) => [...prev, ...response.data.data]);
        } else {
          setEvents(response.data.data);
        }
        page.current++;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMoreEvents(false);
  }, [filterTags, search]);

  function tagEvents(tag: string) {
    if (!tag) {
      setFilterTags([]);
      return;
    }

    setFilterTags((prevState) => {
      if (!prevState.includes(tag)) {
        return [...prevState, tag];
      } else {
        return prevState.filter((t) => t !== tag);
      }
    });
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
          <EventFilter
            tags={tags}
            filterTags={filterTags}
            tagEvents={tagEvents}
          />
        );
      }}
    >
      <View style={styles.container}>
        <SearchBar
          placeholder="Search..."
          round
          onChangeText={(text) => {
            setSearch(text);
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
          scrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate("event", { event: item })}>
              <EventItem event={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </Drawer>
  );
}
