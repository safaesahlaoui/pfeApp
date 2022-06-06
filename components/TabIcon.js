import React from "react";
import { View, Text, Image } from "react-native";
import { FONTS, COLORS } from "../constants";
const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          marginBottom: "35%",
          borderRadius: 30,
          backgroundColor: COLORS.tradecolor,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
            ...iconStyle,
          }}
        />
        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: focused ? COLORS.white : COLORS.secondary,
          ...FONTS.h4,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.bluesecondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.bluesecondary,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
};
export default TabIcon;
