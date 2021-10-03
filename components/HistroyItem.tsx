import React,{FC} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Elements from 'react-native-elements'
import moment from 'moment'

interface Props {
    rate: string;
    card: string;
    iconName: string;
    total: string;
    date:string,
    status: string;
    created_at: string
 }
const HistroyItem :FC<Props>= ({iconName, status, total, created_at, ...props }) => {
    return (
        <View style={styles.container}>
           <Elements.Icon
                name={iconName}
                containerStyle={{margin: 10}}
               { ...props}
            />
            <Elements.Text style={{color: 'white', fontSize:18, alignSelf:'center'}}> 
                {moment(created_at).fromNow()}
            </Elements.Text>

            <Elements.Text style={{color: 'white', fontSize:18, alignSelf:'center', paddingRight: 20}}> 
                {total}
            </Elements.Text>

            <Elements.Text style={{color: 'white', fontSize:18, alignSelf:'center', paddingRight: 20}}> 
                {status}
            </Elements.Text>

        </View>
    )
}

export default HistroyItem

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: 350,
        backgroundColor: '#f63757',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignSelf:'center',
        shadowRadius:0.6,
        borderRadius: 12,
        // shadowColor:'red'
    },
})
