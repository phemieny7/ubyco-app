import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Element from 'react-native-elements'
import { Context as AuthContext } from '../../context/AuthContext'



const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const [phone, setPhone] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const { state, verify, clearMessage } = React.useContext(AuthContext)

   React.useEffect(() => {
    const clearError = navigation.addListener('blur', () => {
        clearMessage()
    });
        return clearError;
    }, [navigation]);
    
    const setColor = () => {
        if (phone.length >= 11) {
            setSuccess('green')
        }
    }

    const doReset = async () => {
        state.errorMessage = ''
        setLoading(true)
        await verify(phone, () => {
            navigation.navigate('Root')
        })
        setLoading(false)
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header} />
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
                                name='mail'
                                size={24}
                                color={phone.length == 6 ? 'green' : 'red'}
                            />
                        }
                        maxLength={13}
                        errorStyle={{ color: '#f63757' }}
                        placeholder='Token'
                        errorMessage={state.errorMessage.verification_code ? state.errorMessage.verification_code: state.errorMessage}
                        value={phone}
                        onChangeText={setPhone}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        autoCorrect={false}
                    />
                    <Element.Button
                        buttonStyle={{ height: 50, backgroundColor: '#f63757', borderRadius: 10 }}
                        containerStyle={{ margin: 10 }}
                        loading={loading}
                        title='Reset Password'
                        onPress={doReset}
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
    },
    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    }
})