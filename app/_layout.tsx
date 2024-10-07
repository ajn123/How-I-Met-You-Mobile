import { Stack } from "expo-router";
import Event from "@/app/event";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
                      options={{headerShown: true}}
                          name="event"

                          />
    </Stack>
  );
}
