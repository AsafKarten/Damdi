import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:"",City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",
//City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",

const PersonalFormScreen2 = ({ navigation, route }) => {

    const [City, onChangeCity] = useState();
    const [Address, onChangeAddress] = useState();
    const [Postal_code, onChangePostal_code] = useState();
    const [Mail_box, onChangeMail_box] = useState();
    const [Telephone, onChangeTelephone] = useState();
    const [Work_telephone, onChangeWork_telephone] = useState();



    const PostPersonalForm2 = (
        userInfo,
        City,
        Address,
        Postal_code,
        Mail_box,
        Telephone,
        Work_telephone
    ) => {
        const userInfo2 = (
            City,
            Address,
            Postal_code,
            Mail_box,
            Telephone,
            Work_telephone
        )
        console.log(userInfo)
        console.log(userInfo2)
        navigation.navigate('PersonalForm3', userInfo, userInfo2)
    }


    return (

        <SafeAreaView style={styles.container}>

            <TextInput
                style={styles.input}
                onChangeText={onChangeCity}
                value={City}
                placeholder="עיר"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={Address}
                placeholder="רחוב"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePostal_code}
                value={Postal_code}
                placeholder="מיקוד"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeMail_box}
                value={Mail_box}
                placeholder="תיבת דואר"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeTelephone}
                value={Telephone}
                placeholder="מס טלפון"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeWork_telephone}
                value={Work_telephone}
                placeholder="מס טלפון בעבודה"
            />

            <Button title="הבא" onPress={() => PostPersonalForm2(
               
                City,
                Address,
                Postal_code,
                Mail_box,
                Telephone,
                Work_telephone
            )}
           />
            <Button title="חזרה" onPress={() => navigation.navigate('PersonalForm')} />

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
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
    },
});
export default PersonalFormScreen2;