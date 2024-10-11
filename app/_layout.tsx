import { Stack } from "expo-router";
import Event from "@/app/event";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: true }} name="event" />
      </Stack>
    </RootSiblingParent>
  );
}
