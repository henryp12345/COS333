import React, { SFC } from "react";
import { Text, TextProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const iconMap = {
  Home: "home",
  Discover: "location-on",
  Add: "add-circle",
  Profile: "chat",
  Notifications: "notifications",
};

const Icon: SFC<
  {
    name: string;
    color: string;
  } & TextProps > = ({ name, color, style, ...props }) => {
  return (
    <MaterialIcons
      name={iconMap[name]}
      color={color}
      size={32}
      style={style}
      {...props}
    />
  );
};

export default Icon;
