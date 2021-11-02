import React, {FC} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons'

interface Props {
    placeholder: string;
    onValueChange: (text: string) => void;
    require: any;
    title:string;
    value:any;
    items:any[];
  }

const Picker: FC<Props> = ({title,placeholder, items, onValueChange, value, require}) => {
    return (
        <View style={pickerSelectStyles.container}> 
            <Text style={pickerSelectStyles.title}>{title}</Text>
            <Text style={{color: 'red', paddingTop: 18, paddingLeft: 5}}>{require}</Text>
            {
              Platform.OS === 'ios' ?  <RNPickerSelect
              items={items}
              onValueChange={onValueChange}
              style={pickerSelectStyles}
              value={value}
              Icon={() => {
                  return <Ionicons name="chevron-down" size={24} color="#f63757" style={{padding: 18}}/>;
          }}
          /> : <View style={{ borderRadius: 18, borderColor:'red', borderWidth: 1, overflow: "hidden", height: 40, padding: 0, width:200, margin: 10 }}>
                <RNPickerSelect
              items={items}
              onValueChange={onValueChange}
              style={pickerSelectStyles}
              value={value}
              Icon={() => {
                  return <Ionicons name="chevron-down" size={24} color="#f63757" style={Platform.OS === 'ios' ? {padding: 18} : {padding: 10}}/>;
          }}
          />
            </View>
            }
           
        </View>
    )
}

export default Picker

const pickerSelectStyles = StyleSheet.create({
  container:{
      flexDirection:'row',
      margin:20,
      alignContent: "center"
  },
  title:{
      fontSize: 18,
      fontWeight:'500',
      paddingTop: 18,
  },
  inputIOS: {
    fontSize: 18,
    fontWeight: 'normal',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 18,
    color: '#f63757',
    paddingRight: 40, // to ensure the text is never behind the icon
    margin: 10,
    width: 200,
    height: 40,
  },
  inputAndroid: {
    fontSize: 18,
    fontWeight: '400',
    color: '#f63757',
    paddingRight: 30, // to ensure the text is never behind the icon
    margin: 10,

  },

});
