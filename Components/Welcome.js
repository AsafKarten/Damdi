
import React from 'react'
import { View, Text } from 'react-native'

export default function Welcome({ navigation, route }) {

    return (
        <View>
            <Text>  ברוך הבא לדאמדי </Text>
            <Text>{route.params != undefined ? route.params.userid : ""}</Text>
        </View>
    )
}
