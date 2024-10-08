import { SocialIcon } from "@rneui/base";
import { Linking, Text, View } from "react-native";

export default function SocialMediaButton({ social }: any) {
  // @ts-ignore
  return (
    <SocialIcon
      type={social.type}
      light
      button
      raised={true}
      onPress={() => Linking.openURL(social.url)}
    />
  );
}
