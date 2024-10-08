import { View, Text, Linking } from "react-native";
import DateUtil from "@/utils/DateUtil";
import SocialMediaButton from "@/components/social/SocialMediaButton";

export default function EventExtraInfo({ event }: any) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {event.socials &&
        event.socials.map((social: any) => {
          return (
            <SocialMediaButton style={{}} key={social.id} social={social} />
          );
        })}
    </View>
  );
}
