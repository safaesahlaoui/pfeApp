import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Portfolio, Market, Profile } from "../screens";
import { COLORS, icons } from "../constants";
import TabIcon from "../components/TabIcon";
import { connect } from "react-redux";
import { setTradeModalVisibility } from "../stores/tab/tabActions";
import { isTradeModalVisible } from "../stores/tab/TabReducer";
const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = ({ setTradeModalVisibility, isTradeModalVisible }) => {
  function tradeTabButtonOnClickHandler() {
    setTradeModalVisibility(!isTradeModalVisible);
  }
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,

        style: {},
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.tabbg,
          height: 60,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={
                  isTradeModalVisible
                    ? {
                        width: 10,
                        height: 10,
                      }
                    : null
                }
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={() => tradeTabButtonOnClickHandler()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setTradeModalVisibility: (isVisible) => {
      return dispatch(setTradeModalVisibility(isVisible));
    },
  };
}
//export default Tabs;
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
