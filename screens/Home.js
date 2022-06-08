import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { BalanceInfo } from "../components";
import IconTextButton from "../components/iconTextButton";
import MainLayout from "./MainLayout";
import { connect } from "react-redux";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from "victory-native";
import marketReducer from "../stores/market/marketReducer";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
//import { holdings } from '../constants/dummy';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  VictoryCustomTheme,
} from "../constants";
import { Chart } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let final = totalWallet.toFixed(2);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let perChenge = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          backgroundColor: COLORS.tabbg,
          height: "25%",
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        {/* Balance info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={final}
          changePct={perChenge}
          containerStyle={{
            marginTop: 50,
          }}
        ></BalanceInfo>
        {/*    Button  */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginBottom: -10,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Sell"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              color: COLORS.white,

              backgroundColor: COLORS.tradecolor,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("transfer")}
          />
          <IconTextButton
            label="Buy"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,

              backgroundColor: COLORS.tradecolor,
            }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
      </View>
    );
  }
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
                  stroke: COLORS.chartColor,
                },
                parent: {
                  border: "1px solid #ccc",
                },
              }}
              data={
                selectedCoin
                  ? selectedCoin?.sparkline_in_7d?.price
                  : coins[0]?.sparkline_in_7d.price
              }
              categories={{
                x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                y: ["15", "30", "45", "60"],
              }}
            ></VictoryLine>
            <VictoryScatter
              data={
                selectedCoin
                  ? selectedCoin?.sparkline_in_7d?.price
                  : coins[0]?.sparkline_in_7d.price
              }
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
                  stroke: COLORS.chartColor,
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

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
      >
        {/*  Header -Walet info */}
        {renderWalletInfoSection()}
        {/*  Chart */}
        <Chart />
        {renderChart()}
        {/*  top Crypto */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}
              >
                Top Cryptocurrency
              </Text>
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
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Logo */}
                <View style={{ width: 25 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>
                {/* Name  */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* Figures */}
                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    ${item.current_price}
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
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            ></View>
          }
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
    coins: state.marketReducer.coins,
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
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
