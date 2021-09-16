import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import BG from '../assets/DAMDI_White_BG.jpg'


const url = "http://proj13.ruppin-tech.co.il/"

export default function UnitOne({ navigation, route }) {
    const [Donator, onChangeDonator] = useState(route.params.route)
    const [donor, onChangeDonor] = useState({ Personal_id: "204610620", First_name: "אסף", Last_name: "קרטן", Phone: "0549214258", Gender: "ז", Birthdate: "03.03.1993", Prev_first_name: "", Prev_last_name: "", City: "ranana", Address: "hertzel 101", Postal_code: "3355", Mail_box: "3", Telephone: "0549214258", Work_telephone: "", Blood_group_member: false, Personal_insurance: false, Confirm_examination: true, Agree_future_don: true, Birth_land: "ישראל", Aliya_year: "", Father_birth_land: "ישראל", Mother_birth_land: "ישראל" });
    const [shouldShow, setShouldShow] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [personal_id, onChangeId] = useState();
    const [Route , onChangeRoute] = useState({Donator:Donator, Donor:donor});

    useEffect(() => {
        (async () => {

            if (Platform.OS !== 'web') {
                setShouldShow(true)
            }
        })()
    }, [])

    const GetDonor =()=>{
        
        console.log("make api request get all user info")
        console.log(Route);
        navigation.navigate('DonorInfo',{route:Route})
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={BG} style={styles.header_img}></Image>
      
               <TextInput
                    style={styles.input}
                    onChangeText={() => onChangeId}
                    value={personal_id}
                    placeholder="תעודת זהות"
                />

            <TouchableOpacity onPress={() => GetDonor()}>
                <View style={styles.button_normal}>

                    <Text style={styles.button_text} >התחל</Text>
                </View>
            </TouchableOpacity>

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
                                    <Text >{Donator.First_name + " " + Donator.Last_name}</Text>
                                    <Text>בחר עמדה</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
                                        <View style={styles.button_normal}>
                                            <Text style={styles.button_text} >עמדה 1</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
                                        <View style={styles.button_normal}>
                                            <Text style={styles.button_text} >עמדה 2</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
                                        <View style={styles.button_normal}>
                                            <Text style={styles.button_text} >עמדה 3</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableHighlight
                                style={{ backgroundColor: '#4d5b70' }}
                                onPress={() => {
                                    setConfirmModal(!confirmModal);
                                }}>
                                <Text>סגור</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            ) : null}


        </SafeAreaView >

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonContainer: {
        flexDirection: 'row'
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
        width: 90,
        height: 90,
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
    header_img: {
        marginBottom: 40,
        width: 260,
        height: 75,
        alignSelf: 'center',
        resizeMode: 'stretch'
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
    HorizontalBox: {
        width:280,
        justifyContent:'space-between',
        flexDirection: 'row-reverse',
        marginTop:12,
    },
});