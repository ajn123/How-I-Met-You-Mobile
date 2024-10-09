import { Button } from "@rneui/base";
import { useEffect, useState } from "react";

export default function EventFilterButton({
  onPress,
  title,
  tags,
  filterTags,
}: any) {
  const buttonStyles = {
    borderRadius: 5,
    margin: 5,
  };

  return (
    <Button
      onPress={() => {
        onPress(title);
      }}
      buttonStyle={
        filterTags.includes(title)
          ? { ...buttonStyles, backgroundColor: "green" }
          : { ...buttonStyles, backgroundColor: "red" }
      }
      title={title}
    />
  );
}
