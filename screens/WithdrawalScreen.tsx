import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, ScrollView, SafeAreaView, Text, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Title from '../components/theme/Title'
import Header from '../components/theme/Header'
import Card from '../components/card/Card'
import RandomInput from '../components/RandomInput';
import Picker from '../components/Picker'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/Button'
import { Context as Home } from '../context/HomeContext'
const WithdrawalScreen = () => {
    const [amount, setAmount] = React.useState('')
    const [account, setAccount] = React.useState([])
    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const [noAccount, setNoAccount] = React.useState(true)

    const {state, getAccount, withdraw} = React.useContext(Home);

    const fetchUser = async() => {
        await getAccount((data: React.SetStateAction<null>) => {
            if (data == null){
                setNoAccount(false)
        }else{
            setAccount(data.map((element: { id: any; bank: string; code: any; }) => ({ key: element.id, label: element.bank, value: element.bank, code: element.code })))

            console.log(account)
        } 
        });
    }

    const requestWithdrawal = async() => {
        setLoading(true)
        await withdraw(amount, value, (data: any) => {
            if(data.status == 200){
               alert('Withdrawal request submitted')
            }else{
                alert(data.data.message)
            }
          
        })
        setLoading(false)
    }
 
    

React.useEffect(() => {
   fetchUser()
  },[]);

    return (
        <SafeAreaView style={{backgroundColor:'#f9e8ef', flex: 1}}>
           <View  style={Platform.OS === 'android' ? {marginTop:30}: {marginTop:0}}>
        <Header />
      </View>

     
     
            <View style={{alignSelf:'center', marginTop: 20}}>
                <Title name={'Withdraw Funds'} />
            </View>

       <View style={{ alignSelf:'center', padding:10}}>
          <Card id={state.user.customer_id} amount={state.user.userAmount != null ? state.user.userAmount.amount : 'pending' }/>
        </View>
        
        <KeyboardAwareScrollView>
        <RandomInput title= 'Amount' placeholder='0' keyType='phone-pad' onChangeText={setAmount} value={amount}/>
            <Picker
                 title="Account" 
                 placeholder="Select your account" 
                 items={account}
                 value={`${value}`}
                 onValueChange = {(key) => setValue(key)}
                 require = '*'
            />
        <View style={{marginHorizontal: 30, marginTop: 20}}>
        <Button title= "Request Withdrawal" onPress={requestWithdrawal} loading={loading}/>
        {!noAccount? <Text>No Account</Text> : null}
        </View>
       
        </KeyboardAwareScrollView>
        

        </SafeAreaView>
    )
}

export default WithdrawalScreen

const styles = StyleSheet.create({})
