import * as React from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator} from "react-native";
import { Text, View, FlatList, Image } from "react-native";
import * as Element from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import { Context as Home } from "../context/HomeContext";
import HistroyItem from "./HistroyItem";
import { useIsFocused } from '@react-navigation/native';




export default function GiftCardHistroy() {
  const [history, setHistory] = React.useState([]);
  const {getUser, state} = React.useContext(Home);
  const user  = async() => {
    let res = await getUser()
  }
  const isFocused = useIsFocused();

  React.useEffect(() => {
    user()
    setHistory(state.user.cardTransaction)
  }, [isFocused])
  return (
    <KeyboardAwareScrollView>
      <View style={{ flex: 1}}>
      {history.length >  0 || history !== undefined ? 
         history.map((i) => (
            <Element.ListItem key={i.id} bottomDivider onPress={()=>console.log('alert')}>
                 {/* <Element.Icon name="place" size={30} /> */}
              <Element.ListItem.Content>
                <HistroyItem
                  iconName = 'gift'
                  type ='font-awesome'
                  color = 'white'
                  created_at={i.created_at}
                  total = {i.total}
                  status = {
                    i.completed === false ? 'Processing' : 'Closed'
                  }      
                />
              </Element.ListItem.Content>
              <Element.ListItem.Chevron />
            </Element.ListItem>
          ))
         : (
          <View>
            <Text>No Transaction Yet</Text>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

