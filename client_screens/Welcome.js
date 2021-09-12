
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import BG from '../assets/DAMDI_White_BG.jpg'
export default function Welcome({navigation , route}) {
const [User, onChangeUser] = useState(route.params.route)
    return (
        <View>
            <Text> ברוך הבא לדאמדי </Text>
            <Image source={BG} style={{ width: 360, height: 150, alignSelf: 'center', resizeMode: 'stretch' }}></Image>

            <TouchableOpacity onPress={() => navigation.navigate('Home', { route: User})}>
                <View style={styles.button_normal}>
                    <Text style={styles.button_text} >המשך</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 160,
      margin: 12,
      borderWidth: 1,
      borderRadius: 8,
      textAlign: 'center',
    },
    button_normal: {
  
      alignItems: 'center',
      width:160,
      margin: 15,
      borderRadius: 8,
      padding: 10,
      backgroundColor: "#757c94",
      opacity:0.8,
      shadowColor:'black',
      shadowRadius:5,
  
    
      
    },
    button_text: {
      color:'white'
    },
  });
  
