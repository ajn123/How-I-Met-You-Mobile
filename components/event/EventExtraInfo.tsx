import { View, Text, Linking, Image } from "react-native";
import DateUtil from "@/utils/DateUtil";
import SocialMediaButton from "@/components/social/SocialMediaButton";
import { Chip, Icon } from "@rneui/base";
import AxiosUtil from "@/utils/AxiosUtil";
import { useState } from "react";

export default function EventExtraInfo({ event }: any) {
  return (
    <View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {event.url != null && event.url !== "" && (
          <SocialMediaButton social={{ type: "link", url: event.url }} />
        )}
        {event.socials &&
          event.socials.map((social: any) => {
            return <SocialMediaButton key={social.id} social={social} />;
          })}
      </View>
    </View>
  );
}
