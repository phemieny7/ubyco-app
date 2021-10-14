import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
// import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Element from 'react-native-elements'
import { Context as AuthContext } from '../../context/AuthContext'

// export default class Employee extends React.Component<any, IState> { }

interface actionContext {
    state: any;
    verify: any;
    clearMessage: any;
}


const VerifyScreen = ({route, navigation}) => {
    // const { screen, phone } = route.params;
    console.log(route)
    // const navigation = useNavigation();
    // const {screen} = route.params
    const [token, setToken] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const { state, verify, clearMessage } = React.useContext<actionContext>(AuthContext)

   React.useEffect(() => {
        const clearError = navigation.addListener('blur', () => {
            setToken('')
            clearMessage()
        });
    
        return clearError;
      }, [navigation]);

    const setColor = () => {
        if (token.length >= 6) {
            setSuccess('green')
        }
    }

    const doVerify = async () => {
        state.errorMessage = ''
        setLoading(true)
        await verify(token, () => {
            navigation.navigate('Root',{screen: "ChangePassword"})
        })
        setLoading(false)
    };

   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Element.Icon
                        type='material'
                        name='arrow-back'
                        color='#f63757'
                        containerStyle={{ alignSelf: 'flex-start', margin: 20 }}
                        onPress={() => navigation.goBack()}
                    />
                    <Element.Text style={{
                        alignSelf: 'center',
                        fontSize: 19,
                        color: '#f63757',
                        fontWeight: 'bold'
                    }}>
                       Confirm Token
                    </Element.Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Element.Text style={{
                    alignSelf: 'flex-start',
                    fontSize: 16,
                    color: '#333333',
                    fontWeight: 'normal',
                    margin: 20
                }}>
                    Kindly input the token sent to you
                </Element.Text>
                {/* Email Input type */}

                <KeyboardAwareScrollView>

                    <Element.Input
                        inputContainerStyle={{ borderWidth: 0.5, borderRadius: 15 }}
                        inputStyle={{ margin: 10 }}
                        containerStyle={{ marginTop: 0, alignSelf: 'center' }}
                        leftIconContainerStyle={{ marginLeft: 15 }}
                        leftIcon={
                            <Element.Icon
                                type='material-icon'
                                name='check'
                                size={24}
                                color={token.length == 6 ? 'green' : 'red'}
                            />
                        }
                        maxLength={6}
                        errorStyle={{ color: '#f63757' }}
                        placeholder='Token'
                        errorMessage={state.errorMessage.verification_code ? state.errorMessage.verification_code: state.errorMessage}
                        value={token}
                        onChangeText={setToken}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        autoCorrect={false}
                    />
                    <Element.Button
                        buttonStyle={{ height: 50, backgroundColor: '#f63757', borderRadius: 10 }}
                        containerStyle={{ margin: 10 }}
                        loading={loading}
                        title='Verify'
                        onPress={doVerify}
                    />

                    <Element.Button
                        title='Request A New Token'
                        type='clear'
                        titleStyle={{ color: '#f63757', fontSize: 15 }}
                        onPress={() => navigation.navigate('Root')}
                    />




                </KeyboardAwareScrollView>




            </View>
        </SafeAreaView>
    )
}

export default VerifyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9e8ef'
    },
    header: {
        backgroundColor: '#f9e8ef',
        flex: 2,
    },

    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    }

})
