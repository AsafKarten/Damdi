import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert,Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:""

const PersonalFormScreen = ({ navigation , route }) => {
    const Personal_id = route.params.route.Personal_id
    const [First_name, onChangeFirst_name] = useState(route.params.route.First_name);
    const [Last_name, onChangeLast_name] = useState(route.params.route.Last_name);
    const [Phone, onChangePhone] = useState(route.params.route.Phone);
    const [Gender, onChangeGender] = useState(route.params.route.Gender);
    const [Birthdate, onChangeBirthdate] = useState(route.params.route.Birthdate);
    const [Prev_first_name, onChangePrev_first_name] = useState(route.params.route.Prev_first_name);
    const [Prev_last_name, onChangePrev_last_name] = useState(route.params.route.Prev_last_name);
 
    const PostPersonalForm=(
        Personal_id,
        First_name,
        Last_name,
        Phone, 
        Gender,
        Birthdate,
        Prev_first_name,
        Prev_last_name,
        )=>{
            const userInfo={
                Personal_id,
                First_name,
                Last_name,
                Phone, 
                Gender,
                Birthdate,
                Prev_first_name,
                Prev_last_name,
            }
            console.log(userInfo)
            navigation.navigate('PersonalForm2', userInfo )

    }

    return (

        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeFirst_name}
                value={First_name}
                placeholder="שם פרטי"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeLast_name}
                value={Last_name}
                placeholder="שם משפחה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={Phone}
                placeholder="מס פלאפון"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeGender}
                value={Gender}
                placeholder="מין"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeBirthdate}
                value={Birthdate}
                placeholder="תאריך לידה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePrev_first_name}
                value={Prev_first_name}
                placeholder="שם קודם: פרטי"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePrev_last_name}
                value={Prev_last_name}
                placeholder="שם קודם: משפחה"
            />
           
           
           
            <Button
                title="הבא"
                onPress={() => PostPersonalForm(
                    Personal_id,
                    First_name,
                    Last_name,
                    Phone, 
                    Gender,
                    Birthdate,
                    Prev_first_name,
                    Prev_last_name,
                    )}
            />
           
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
export default PersonalFormScreen;
