import { View, Text, Linking, Image } from "react-native";
import DateUtil from "@/utils/DateUtil";
import SocialMediaButton from "@/components/social/SocialMediaButton";
import { Chip, Icon } from "@rneui/base";

export default function EventExtraInfo({ event }: any) {
  return (
    <View>
      <Image
        style={{ width: 100, height: 100, margin: 5 }}
        resizeMode={"contain"}
        source={require("@/assets/images/react-logo.png")}
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {event.url === "" ? null : (
          <SocialMediaButton social={{ type: "link", url: event.url }} />
        )}
        {event.socials &&
          event.socials.map((social: any) => {
            return (
              <SocialMediaButton style={{}} key={social.id} social={social} />
            );
          })}
      </View>
    </View>
  );
}
