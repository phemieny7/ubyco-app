import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Element from 'react-native-elements'
import { Context as AuthContext } from '../../context/AuthContext'


interface actionContext {
    state: any;
    forget: any;
    clearMessage: any;
}

const ResetPasswordScreen = ({navigation}) => {
    const [phone, setPhone] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const { state, forget, clearMessage } = React.useContext<actionContext>(AuthContext)

    React.useEffect(() => {
        const clearError = navigation.addListener('blur', () => {
            setPhone('')
            clearMessage()
        });
        return clearError;
    }, [navigation]);

    const doReset = async () => {
        state.errorMessage = ''
        setLoading(true)
        await forget(phone, () => {
            navigation.navigate('Verify',{ItemId: 1});
        })
        setLoading(false)
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
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
                        Reset Password
                    </Element.Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Element.Image
                        source={require('../../assets/images/logo.png')}
                        style={{
                            height: 200,
                            width: 200,
                            alignSelf: 'center'
                        }}
                    />
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
                                name='phone'
                                size={24}
                                color={phone.length > 10 ? 'red' : 'black'}
                            />
                        }
                        maxLength={13}
                        errorStyle={{ color: '#f63757' }}
                        placeholder='Enter your phone number'
                        errorMessage={state.errorMessage.verification_code ? state.errorMessage.verification_code : state.errorMessage}
                        value={phone}
                        onChangeText={setPhone}
                        autoCapitalize='none'
                        keyboardType='phone-pad'
                        autoCorrect={false}
                    />
                    <Element.Button
                        buttonStyle={{ height: 50, backgroundColor: '#f63757', borderRadius: 10 }}
                        containerStyle={{ margin: 10 }}
                        loading={loading}
                        title='Request token'
                        onPress={() => doReset()}
                    />
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9e8ef'
    },
    header: {
        backgroundColor: '#f9e8ef',
        flex: 2,
        // margin:20
    },
    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    }
})