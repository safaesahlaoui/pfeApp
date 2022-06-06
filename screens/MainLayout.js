import React from "react";
import { View, Animated } from "react-native";
import { COLORS, SIZES, icons } from "../constants";
//import IconTextButton from '../components/iconTextButton';
import * as redux from "redux";
import IconTextButton from "../components/iconTextButton";
import { connect } from "react-redux";

const MainLayout = ({ children, isTradeModalVisible }) => {
  const modalAnimationValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);
  const modalY = modalAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
      {/*    Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimationValue}
        />
      )}
      {/*Modal  */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          marginBottom: 0,
          marginTop: 60,
          top: modalY,
          height: "25%",
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("transfer")}
          containerStyle={{
            marginTop: "7%",
            width: 260,
            marginLeft: 60,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base,
            marginLeft: 60,
            width: 260,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Withdraw")}
        />
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
//export default MainLayout
