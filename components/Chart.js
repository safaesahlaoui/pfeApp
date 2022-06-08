import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import {ChartDot,ChartPath,ChartPathProvider,ChartXLabel,ChartYLabel,monotoneCubicInterpolation,} from "@rainbow-me/animated-charts";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from "victory-native";

import { COLORS, SIZES, FONTS, VictoryCustomTheme } from "../constants";
const Chart = ({ containerStyle, chartPrices }) => {
  /* function renderChart() {
    return (
      
    ); */

  return (
    <View>
      <Text
        style={{
          color: COLORS.white,
        }}
      >
        Chart
      </Text>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.padding,
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default Chart;
