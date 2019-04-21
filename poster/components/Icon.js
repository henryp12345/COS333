import React, { SFC } from "react";
import { Text, TextProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const iconMap = {
  Home: "md-home",
  Discover: "md-search",
  Add: "md-add",
  Profile: "md-calendar",
  Notifications: "md-notifications",

};

const Icon: SFC<
  {
    name: string;
    color: string;
  } & TextProps > = ({ name, color, style, ...props }) => {
  return (
    <Ionicons
      name={iconMap[name]}
      color={color}
      size={30}
      style={style}
      {...props}
    />
  );
};

export default Icon;
