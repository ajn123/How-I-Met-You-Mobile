import { Stack } from "expo-router";
import Event from "@/app/event";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
                      options={{headerShown: false}}
                          name="event"
                      initialParams={{ itemId: 42 }}
                          />
    </Stack>
  );
}
