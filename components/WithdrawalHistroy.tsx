import * as React from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Text, View, FlatList, Image } from 'react-native';
import * as Element from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native';

import { Context as Home } from '../context/HomeContext'


export default function WithdrawalHistroy() {

  const [history, setHistory] = React.useState([]);
  const {state} = React.useContext(Home);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    setHistory(state.user.userWithdrawal)
  }, [isFocused]);
  
  return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={{ alignSelf: 'center' }}>
        {
        history.length >  0 || history !== undefined ? 
         history.map((l, i) => (
            <Element.ListItem key={i} bottomDivider>
              <Element.Icon name='dollar-sign'/>
              <Element.ListItem.Content>
                <Element.ListItem.Title>{i.total}</Element.ListItem.Title>
                <Element.ListItem.Subtitle>{moment(l.created_at).calendar()}</Element.ListItem.Subtitle>
                <View>          
                  {/* <Image source={} style={}/> */}
                  <Text>5 months ago</Text>        
                </View>
              </Element.ListItem.Content>
            </Element.ListItem>
          )):
          <View>
            <Text>
              No Transaction Yet
            </Text>
          </View>
        }
        </View>
        </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectCard: {
    borderColor: 'green',
    position: 'absolute',
    marginLeft: 100
  },
});