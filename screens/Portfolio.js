import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getHoldings } from "../stores/market/marketAction";
import { BalanceInfo } from "../components";
import { Chart } from "../components";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from "victory-native";
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  VictoryCustomTheme,
} from "../constants";
import MainLayout from "./MainLayout";
const Portfolio = ({ getHoldings, myHoldings }) => {
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, [])
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let final = totalWallet.toFixed(2);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let perChenge = (valueChange / (totalWallet - valueChange)) * 100;
  function renderChart() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          alignItems: "center",
          borderRadius: SIZES.radius,
          borderColor: COLORS.white,
        }}
      >
        {/* Header */}
        {/*  Chart */}
        <View
          style={{
            marginTop: -25,
          }}
        >
          <VictoryChart
            theme={VictoryCustomTheme}
            height={220}
            width={SIZES.width - 40}
          >
            <VictoryLine
              style={{
                data: {
                  stroke: COLORS.bg,
                },
                parent: {
                  border: "1px solid #ccc",
                },
              }}
              data={
                selectedCoin
                  ? selectedCoin?.sparkline_in_7d?.value
                  : myHoldings[0]?.sparkline_in_7d.value
              }
              categories={{
                x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                y: ["15", "30", "45", "60"],
              }}
            ></VictoryLine>
            <VictoryScatter
              data={myHoldings[0]?.sparkline_in_7d?.value}
              size={2}
              style={{
                data: {
                  fill: COLORS.secondary,
                },
              }}
            />
            <VictoryAxis
              style={{
                grid: {
                  stroke: COLORS.transparentBlack,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: {
                  stroke: COLORS.white,
                },
                grid: {
                  stroke: "grey",
                },
              }}
            />
          </VictoryChart>
        </View>
        {/* Options */}
        {/* Dots */}
      </View>
    );
  }

  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          backgroundColor: COLORS.tabbg,
        }}
      >
        <Text
          style={{
            marginTop: 50,
            color: COLORS.white,
            ...FONTS.largeTitle,
          }}
        >
          Portfolio
        </Text>
        <BalanceInfo
          title=""
          displayAmount={final}
          changePct={perChenge}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  }
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
      >
        {/* Header - Current balance */}
        {renderCurrentBalanceSection()}
        {/* Chart */}
        {renderChart()}
        {/* Assets */}
        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              {/* Title Section */}
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.white,
                }}
              >
                Your Assets
              </Text>
              {/* Header Label */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                  }}
                >
                  Asset
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Holding
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 55,
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Asset */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* Price */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    ${item.current_price.toLocaleString()}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        color: priceColor,
                        marginLeft: 5,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
                {/* Holdings */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.black,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    ${item.total.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.lightGray3,
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}
                  >
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};
function mapStateToProps(state) {
  return {
    // myHoldings:state.marketReducer.myHoldings,
    //coins:state.marketReducer.coins
    myHoldings: state.marketReducer.myHoldings,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
