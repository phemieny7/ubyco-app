import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import * as Element from 'react-native-elements'
import Header from '../components/theme/Header'
import Title from '../components/theme/Title'
import * as Linking from 'expo-linking';

const HelpScreen = () => {
    return (
        <SafeAreaView style={{backgroundColor:'#f9e8ef', flex: 1}}>
           <View  style={Platform.OS === 'android' ? {marginTop:30}: {marginTop:0}}>
        <Header />
      </View>

            <View style={{alignSelf:'center',}}>
                <Title name={'Support'} />
            </View>
            <View style={{alignSelf:'center', margin: 20}}>
                <Element.Text h4>
                    Reach Out to us using the platforms
                </Element.Text>
            </View>

            <View style={{flexDirection:'row', margin: 20, alignSelf:'center'}}> 
            <Element.Icon
                raised
                name='whatsapp'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL('https://whatsapp.com')} 
            />

            <Element.Icon
                raised
                name='instagram'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL('https://instagram.com')} 
            />
            <Element.Icon
                raised
                name='facebook'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL('https://facebook.com')} 
            />
            </View>

        </SafeAreaView>
    )
}

export default HelpScreen

const styles = StyleSheet.create({})
