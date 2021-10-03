import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { View } from "react-native";
import * as Element from "react-native-elements";
import Title from "../components/theme/Title";
import Header from "../components/theme/Header";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Context as Home } from "../context/HomeContext";

export default function CoinScreen({ navigation, route }) {
  const { state, getUser, updateProfile } = React.useContext(Home);
  const [email, setEmail] = React.useState(state.user.email);
 
  const [phone, setPhone] = React.useState(state.user.phone);
  const [fullname, setFullname] = React.useState(state.user.fullname);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const [image, setImage] = React.useState(
    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
  );

  const fetchUser = async () => {
    let res = await getUser();
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const pickImage = () => {
    navigation.navigate("ImageBrowser", { screen: "Profile", max: 1 });
  };

  useFocusEffect(
    React.useCallback(() => {
      const photo = route.params?.photos;
      const set = setImage(photo);
      return set;
    }, [route.params])
  );

  const update = async() => {
      setLoading(true)
     await updateProfile(email, fullname, phone, image,  (data: any)=>{
        if (data == 200) {
            alert('Profile Updated succesfully')
          } else {
            alert('something went wrong')
          }
     })
     setLoading(false)
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#f9e8ef", flex: 1 }}>
      <View>
        {/* <Header /> */}
          <Element.Icon
                    type='material'
                    name='arrow-back'
                    containerStyle={{ alignSelf: 'flex-start', margin: 20 }}
                    onPress={() => navigation.goBack()}
            />
      </View>

      <KeyboardAwareScrollView
        style={{ marginTop: 40, marginBottom: 30, flex: 1 }}
      >
        {/* Title */}
        <View style={{ alignSelf: "center" }}>
          <Title name={"User Profile"} />
        </View>

        <View style={{ alignSelf: "center", marginTop: 10 }}>
          <Element.Avatar
            size="large"
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => pickImage()}
            activeOpacity={0.7}
            source={{
              uri: `${image}`, 
            }}
          />
        </View>

        <Element.Input
          inputContainerStyle={{
            borderWidth: 0.5,
            borderRadius: 15,
            marginTop: 10,
          }}
          inputStyle={{ margin: 10 }}
          containerStyle={{ marginTop: 0, alignSelf: "center" }}
          leftIconContainerStyle={{ marginLeft: 15 }}
          leftIcon={
            <Element.Icon
              type="material-icon"
              name="email"
              size={24}
              color="#333333"
            />
          }
          errorStyle={{ color: "#f63757" }}
          placeholder="Email"
          errorMessage={state.errorMessage ? state.errorMessage.email : null}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <Element.Input
          inputContainerStyle={{ borderWidth: 0.5, borderRadius: 15 }}
          inputStyle={{ margin: 10 }}
          containerStyle={{ marginTop: 0, alignSelf: "center" }}
          leftIconContainerStyle={{ marginLeft: 15 }}
          leftIcon={
            <Element.Icon
              type="ant-design"
              name="user"
              size={24}
              color="#333333"
            />
          }
          errorStyle={{ color: "#f63757" }}
          placeholder="Fullname"
          errorMessage={state.errorMessage ? state.errorMessage.fullname : null}
          value={fullname}
          onChangeText={setFullname}
          autoCapitalize="none"
          keyboardType="default"
        />

        <Element.Input
          inputContainerStyle={{ borderWidth: 0.5, borderRadius: 15 }}
          inputStyle={{ margin: 10 }}
          containerStyle={{ marginTop: 0, alignSelf: "center" }}
          leftIconContainerStyle={{ marginLeft: 15 }}
          leftIcon={
            <Element.Icon
              type="material"
              name="phone"
              size={24}
              color="#333333"
            />
          }
          errorStyle={{ color: "#f63757" }}
          placeholder="Phone"
          errorMessage={state.errorMessage ? state.errorMessage.phone : null}
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          keyboardType="numeric"
        />
       

        <Element.Button
          title="Update Profile"
          buttonStyle={{
            height: 50,
            backgroundColor: "#f63757",
            borderRadius: 10,
          }}
          containerStyle={{ margin: 10 }}
          loading={loading}
          onPress={()=>update()}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
