import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
} from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  Route,
  SceneRendererProps,
  TabBarIndicatorProps,
  TabBarProps,
} from "react-native-tab-view";
import Title from "../components/theme/Title";
import Header from "../components/theme/Header";
import { Scene } from "react-native-tab-view/lib/typescript/src/types";
import GiftCardHistroy from '../components/GiftCardHistroy'
import CryptoHistroy from '../components/CryptoHistroy'
import WithdrawalHistroy from '../components/WithdrawalHistroy'


const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  first: CryptoHistroy,
  second: GiftCardHistroy,
  third: WithdrawalHistroy,
});

const renderTabBar = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TabBar<Route>> &
    Pick<
      Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode }>,
      | "style"
      | "children"
      | keyof SceneRendererProps
      | "navigationState"
      | "scrollEnabled"
      | "bounces"
      | "activeColor"
      | "inactiveColor"
      | "pressColor"
      | "pressOpacity"
      | "renderLabel"
      | "renderIcon"
      | "renderBadge"
      | "renderTabBarItem"
      | "onTabPress"
      | "onTabLongPress"
      | "tabStyle"
      | "indicatorStyle"
      | "indicatorContainerStyle"
      | "labelStyle"
      | "contentContainerStyle"
    > &
    Partial<
      Pick<
        Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode }>,
        | "getLabelText"
        | "getAccessible"
        | "getAccessibilityLabel"
        | "getTestID"
        | "renderIndicator"
      >
    > &
    Partial<
      Pick<
        {
          getLabelText: ({ route }: Scene<Route>) => string | undefined;
          getAccessible: ({ route }: Scene<Route>) => boolean;
          getAccessibilityLabel: ({
            route,
          }: Scene<Route>) => string | undefined;
          getTestID: ({ route }: Scene<Route>) => string | undefined;
          renderIndicator: (props: TabBarIndicatorProps<Route>) => JSX.Element;
        },
        never
      >
    >
) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "#f63757" }}
  />
);

export default function RateCalculatorScreen() {
  const [coin, setCoin] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Crypto" },
    { key: "second", title: "Giftcard" },
    { key: "third", title: "Withdrawals" },
  ]);

  return (
    <SafeAreaView style={{ backgroundColor: "#f9e8ef", flex: 1 }}>
      <View>
        <Header />
      </View>

      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <Title name={"Transaction Histroy"} />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{ margin: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
