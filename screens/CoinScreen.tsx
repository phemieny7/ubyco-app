import * as React from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { View, Clipboard } from "react-native";
import * as Element from "react-native-elements";
import Picker from "../components/Picker";
import Title from "../components/theme/Title";
import Header from "../components/theme/Header";
import RandomInput from "../components/RandomInput";
import Button from "../components/Button";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Context as Home } from "../context/HomeContext";
// import Clipboard from 'expo-clipboard';

export default function CoinScreen({ navigation, route }) {
  const [coin, setCoin] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [coinValue, setCoinValue] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [check, setCheck] = React.useState(true);
  const [comment, setComment] = React.useState(null);
  const [rate, setRate] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [wallet, setWallet] = React.useState('');

  const { coinType, initiateCoinTrade } = React.useContext(Home);

  const fetchCoinData = React.useCallback(async () => {
    await coinType(
      (data: {
        map: (
          arg0: (element: any) => {
            key: any;
            label: any;
            value: any;
            rate: any;
            wallet: string;
          }
        ) => React.SetStateAction<never[]>;
      }) => {
        setCoin(
          data.map((element) => ({
            key: element.id,
            label: element.name,
            value: element.name,
            rate: element.rate,
            wallet: element.wallet
          }))
        );
      }
    );
  }, []);

  React.useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  React.useEffect(() => {
    if (coinValue != "") {
      const tot = Number(amount) * Number(rate);
      setTotal(`${tot}`);
    }
  }, [amount]);

  const onBrandSelect = async (e: React.SetStateAction<string>) => {
    fetchCoinData();
    setRate(null);
    setId(null);
    setAmount("");
    setCheck(false);
    setCoinValue(e);
    setWallet('')
  };

  const onChangePrice = (e: React.SetStateAction<string>) => {
    if (coinValue != null) {
     
      let obj:any = coin.find((o) => o.label === coinValue);
      setId(obj.key);
      setRate(obj.rate);
      setAmount(e);
      setWallet(obj.wallet);
    } else {
      alert("Select a coin");
    }
  };

  const pickImage = () => {
    navigation.navigate("ImageBrowser", { screen: "CoinScreen", max: 2 });
  };

  useFocusEffect(
    React.useCallback(() => {
      const photo = route.params?.photos;
      const set = setImage(photo);
      return set;
    }, [route.params])
  );

  //submit card for trade
  const tradeCoin = async () => {
    setLoading(true);
    await initiateCoinTrade(id, amount, comment, image, rate, (data: any) => {
      if (data != 200) {
        alert("Something Went Wrong");
      } else {
        alert("Coin trasaction submitted");
        setImage(null);
        setComment(null);
        setRate(null);
        setId(null);
        setAmount("");
        setWallet("");
      }
    });
    setLoading(false);
  };
  const copyToClipboard = () => {
    Clipboard.setString(wallet);
    alert('Address Copied to Clipboard')
  };


  const renderImage = (item: { uri: any }, i: React.Key | null | undefined) => {
    <Element.Image
      style={{ height: 100, width: 100 }}
      source={{ uri: item.uri }}
      key={i}
    />;
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f9e8ef", flex: 1 }}>
     <View style={Platform.OS === 'android' ? {marginTop:30}: {marginTop:0}}>
        <Header />
      </View>

      <KeyboardAwareScrollView
        style={{ marginTop: 40, marginBottom: 30, flex: 1 }}
      >
        {/* Title */}
        <View style={{ alignSelf: "center" }}>
          <Title name={"Trade Coin"} />
        </View>

        <View style={{ alignSelf: "center" }}>
          <Picker
            title="Coin"
            placeholder="Select A Coin Brand"
            items={coin}
            value={coinValue}
            onValueChange={(value) => onBrandSelect(value)}
            require="*"
          />
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          />

          <RandomInput
            title="Price"
            placeholder="$"
            value={amount}
            onChangeText={(e: any) => onChangePrice(e)}
            keyType="phone-pad"
            disable={check}
          />

          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          />

          <RandomInput
            title="Total"
            placeholder="0"
            value={total}
            onChangeText={setTotal}
            disable
            keyType='default'
          />

          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          />

            {
              wallet !== '' ?
              <View style={{flexDirection:'column', margin:10}}>
                <Element.Text style={{justifyContent:'center'}}>Address</Element.Text> 
                <Element.Button title={wallet} titleStyle={{color:'red'}}  type="clear" onPress={() => copyToClipboard()}/>
            </View>:<Element.Text style={{flexDirection:'column', margin:10}}>
                Enter an amount to get a wallet address
              </Element.Text>
            }
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          />
          
          <Element.Button
            title="Upload Receipt"
            titleStyle={{ alignSelf: "flex-end", color: "black" }}
            buttonStyle={{ borderRadius: 40, borderColor: "red" }}
            containerStyle={{ margin: 10, height: 40, borderColor: "red" }}
            onPress={pickImage}
            type="outline"
          />

          <View style={{ flexDirection: "row" }}>
            {image &&
              image.map(
                (item: { uri: any }, i: React.Key | null | undefined) => (
                  <Element.Image
                    source={{ uri: item.uri }}
                    key={i}
                    style={{ width: 50, height: 50, margin: 4 }}
                  />
                )
              )}
          </View>
          <Element.Input
            placeholder="Add a Comment"
            containerStyle={{
              alignSelf: "center",
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "red",
            }}
            inputContainerStyle={{
              width: 300,
              padding: 7,
            }}
            multiline={true}
            value={comment}
            onChangeText={setComment}
          />
          <View style={{ marginTop: 10 }}>
            <Button title="Trade Coin" onPress={tradeCoin} loading={loading} />
          </View>
          <View>
            <Element.Text style={{ fontSize: 12, color: "red" }}>
              Note: Users are to upload screenshot of sending apps alone
            </Element.Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
