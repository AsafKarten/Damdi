import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"


export default function ScheduleAppointment({ navigation, route }) {
    
    const [User, onChangeUser] = useState(route.params.route.User)
    const [AppointDate, onChangeDate] = useState(route.params.route.dateTime)
    const [Station, onChangeStation] = useState(route.params.route.Station)
    const [Appointment, onChangeApp] = useState({ Station_code: Station.Station_code , Personal_id: User.Personal_id , App_time: AppointDate  })
    const [appointmentsTime, onChangeAppTime] = useState()
   
    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;

     const ScheduleApp = (item) => {
        navigation.navigate('Appointments', {route: User})
    }
    
    useEffect(() => {
        (async () => {
            SetTimes()
        })()
    }, [])

    const SetTimes = () => {
        var times = []
        let st =parseInt(Station.Start_time) 
        let et =parseInt(Station.End_time)
        for(var i = st; i <= et; i++){
            let Time = i
            times.push(Time)
        }
        onChangeAppTime(times)
    }

    return (
        <View style={styles.container}>
        
            <FlatList
                data={appointmentsTime}
                keyExtractor={(item) => item.Time}
                renderItem={({ item }) => (
                    <View style={styles.list}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => ScheduleApp(item)}>
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
