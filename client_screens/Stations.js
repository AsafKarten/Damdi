import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"


export default function Stations({ navigation, route }) {
    const [User, onChangeUser] = useState(route.params.route)
    const [AppointDate, onChangeDate] = useState(dateTime)
    const [City, onChangeCity] = useState("")

    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={() => onChangeDate}
                value={AppointDate}
                placeholder="תאריך"
            />
            <TextInput
                style={styles.input}
                onChangeText={() => onChangeCity}
                value={City}
                placeholder="עיר/ישוב"
            />
            <TouchableOpacity onPress={() => SearchStation()}>
                <View style={styles.button_normal}>
                    <Text style={styles.button_text} >חיפוש</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    );
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
        width: 160,
        margin: 15,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#757c94",
        opacity: 0.8,
        shadowColor: 'black',
        shadowRadius: 5,



    },
    button_text: {
        color: 'white'
    },
});
