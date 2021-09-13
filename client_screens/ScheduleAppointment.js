import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"


export default function ScheduleAppointment({ navigation, route }) {

    const [User, onChangeUser] = useState(route.params.route.User)
    const [AppointDate, onChangeDate] = useState(route.params.route.dateTime)
    const [Station, onChangeStation] = useState(route.params.route.Station)
    const [Appointment, onChangeApp] = useState({ Station_code: Station.Station_code, Personal_id: User.Personal_id, App_time: AppointDate })
    const [appointmentsTime, onChangeAppTime] = useState()
    const [shouldShow, setShouldShow] = useState(false);
    const [confirmModal, setConfirm] = useState(false);
    const [Item, setItem] = useState({date:"" , time:0});

    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;


    const ScheduleApp = (item) => {
        setItem(item)
        setConfirm(true)
        if (Platform.OS !== 'web') {
            setConfirm(true)
        }
        else {
            console.log(item.date + " " + item.time)
        }

    }

    useEffect(() => {
        (async () => {
            SetTimes()
            if (Platform.OS !== 'web') {
                setShouldShow(true)
            }
        })()
    }, [])

    const SetTimes = () => {
        var times = []
        let st = parseInt(Station.Start_time)
        let et = parseInt(Station.End_time)
        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        for (var i = st; i <= et; i++) {
            var app = { date: date, time: i }

            times.push(app)
        }
        onChangeAppTime(times)
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={appointmentsTime}
                keyExtractor={(item) => item.time}
                renderItem={({ item }) => (
                    <View style={styles.list}>
                        <Text>{item.date + " " + item.time}</Text>
                        <TouchableOpacity onPress={() => ScheduleApp(item)}>
                            <View style={styles.button_normal}>
                                <Text style={styles.button_text} >הזמן/י תור</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )} />

            {shouldShow ? (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmModal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View >
                        <View >


                            <View style={styles.list}>
                                <View >
                                    <Text >{Item.date + " " + Item.time}</Text>
                                    <Text>כאן יהיה אישור קביעת תור</Text>
                                </View>
                            </View>
                            <TouchableHighlight
                                style={{ backgroundColor: '#4d5b70' }}
                                onPress={() => {
                                    setConfirm(!confirmModal);
                                }}>
                                <Text>סגור</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            ) : null}
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
