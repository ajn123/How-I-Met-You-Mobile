import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Button } from "react-native";
import { useState } from "react";

export default function TabLayout() {
  // @ts-ignore
  return (
    <Tabs>
      <Tabs.Screen
        name={"index"}
        options={{
          title: "Events",
          tabBarIcon: (color, focused) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={"contact"}
        options={{
          title: "Contact",
          tabBarIcon: (color, focused) => (
            <TabBarIcon name={focused ? "mail" : "mail"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
