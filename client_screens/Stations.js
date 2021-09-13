import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"


export default function Stations({ navigation, route }) {
    const [User, onChangeUser] = useState(route.params.route)
    const [AppointDate, onChangeDate] = useState(dateTime)
    const [City, onChangeCity] = useState("")
    const [Stations, onChangeStations] = useState([
        { Station_code: 1, City: 'רעננה', F_address: 'הנכשלים 8', Start_time: '8:00', End_time: '16:00', Lat: '65.5575', Lng: '68.77676' },
        { Station_code: 2, City: 'רופין', F_address: 'חרוב 5', Start_time: '8:00', End_time: '12:00', Lat: '67.5775', Lng: '68.77676' },
    ])

    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;

     const ShAppointment = (item) => {
        navigation.navigate('Appointments', {route: User})
    }

    return (
        <View style={styles.container}>
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

            <FlatList
                data={Stations}
                keyExtractor={(item) => item.Station_code}
                renderItem={({ item }) => (
                    <View style={styles.list}>
                        <Text>{item.City}</Text>
                        <Text>{item.F_address}</Text>
                        <Text>{item.Start_time + " - " + item.End_time}</Text>
                        <TouchableOpacity onPress={() => ShAppointment(item)}>
                            <View style={styles.button_normal}>
                                <Text style={styles.button_text} >הזמן/י תור</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )} />


        </View>
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
    list: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 16,
        padding: 28,
        borderWidth: 1,
        borderRadius: 9,
        borderColor: 'grey',
        backgroundColor: "#fcfff9",
        color: "black",
    },
});
