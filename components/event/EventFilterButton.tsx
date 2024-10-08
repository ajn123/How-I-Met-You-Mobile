import { Button } from "@rneui/base";
import { useEffect, useState } from "react";

export default function EventFilterButton({ onPress, title }: any) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {}, [pressed]);

  const buttonStyles = {
    borderRadius: 5,
    margin: 5,
  };

  return (
    <Button
      onPress={() => {
        onPress();
        setPressed((pressed) => !pressed);
      }}
      buttonStyle={
        pressed
          ? { ...buttonStyles, backgroundColor: "green" }
          : { ...buttonStyles, backgroundColor: "red" }
      }
      title={title}
    />
  );
}
