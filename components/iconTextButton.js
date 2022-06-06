import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginBottom: 0,
        alignItems: "center",
        justifyContent: "center",
        height: 90,
        width: 700,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        color: COLORS.white,
        marginTop: "2%",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.base,
          color: COLORS.black,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default IconTextButton;
