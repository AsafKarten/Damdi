
import React from 'react'
import { View, Text } from 'react-native'

export default function Welcome({ route }) {

    return (
        <View>
            <Text> ברוך הבא לדאמדי {route.params != undefined ? route.params.userid : ""} </Text>
        </View>
    )
}
