
import React from 'react'
import { View, Text, Image } from 'react-native'
import BG from '../assets/DAMDI_White_BG.jpg'
export default function Welcome() {

    return (
        <View>
            <Text> ברוך הבא לדאמדי </Text>
            <Image source={BG} style={{width:360, height: 150 , alignSelf:'center',resizeMode: 'stretch'}}></Image>
        </View>
    )
}
