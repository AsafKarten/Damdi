import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"

//Personal_id:"204610620",First_name:"אסף",Last_name:"קרטן",Phone:"0549214258",Gender:"ז" ,Birthdate:"03.03.1993" ,Prev_first_name:"" ,Prev_last_name:"",City:"ranana", Address:"hertzel 101", Postal_code:"3355", Mail_box:"3", Telephone:"0549214258", Work_telephone:"",Blood_group_member:False, Personal_insurance:False, Confirm_examination:True, Agree_future_don:True, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"
//Blood_group_member:False, Personal_insurance:False, Confirm_examination:True, Agree_future_don:True, Birth_land:"ישראל", Aliya_year:"", Father_birth_land:"ישראל", Mother_birth_land:"ישראל"

const PersonalFormScreen3 = ({ navigation, route}) => {

    
    const [Blood_group_member, onChangeBlood_group_member] = useState();
    const [Personal_insurance, onChangePersonal_insurance] = useState();
    const [Confirm_examination, onChangeConfirm_examination] = useState();
    const [Agree_future_don, onChangeAgree_future_don] = useState();
    const [Birth_land, onChangeBirth_land] = useState();
    const [Aliya_year, onChangeAliya_year] = useState();
    const [Father_birth_land, onChangeFather_birth_land] = useState();
    const [Mother_birth_land, onChangeMother_birth_land] = useState();


    const PostPersonalForm3 = (
        Blood_group_member,
        Personal_insurance,
        Confirm_examination,
        Agree_future_don,
        Birth_land,
        Aliya_year,
        Father_birth_land,
        Mother_birth_land
    ) => {
        const userInfo3 = (
                Blood_group_member,
                Personal_insurance,
                Confirm_examination,
                Agree_future_don,
                Birth_land,
                Aliya_year,
                Father_birth_land,
                Mother_birth_land
        )
        navigation.navigate('Welcome')
    }

    return (

        <SafeAreaView style={styles.container}>

        
            <TextInput
                style={styles.input}
                onChangeText={onChangeBlood_group_member}
                value={Blood_group_member}
                placeholder="חבר ארגון תורמי דם"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePersonal_insurance}
                value={Personal_insurance}
                placeholder="ביטוח אישי"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeConfirm_examination}
                value={Confirm_examination}
                placeholder="מסכים לשימוש בניסויים"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAgree_future_don}
                value={Agree_future_don}
                placeholder="מסכים לקבלת הזמנות לתרום דם בעתיד"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeBirth_land}
                value={Birth_land}
                placeholder="ארץ לידה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeAliya_year}
                value={Aliya_year}
                placeholder="שנת עליה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeFather_birth_land}
                value={Father_birth_land}
                placeholder="ארץ לידת אב"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeMother_birth_land}
                value={Mother_birth_land}
                placeholder="ארץ לידת אם"
            />

            <Button title="סיום" onPress={() => PostPersonalForm3(
                Blood_group_member,
                Personal_insurance,
                Confirm_examination,
                Agree_future_don,
                Birth_land,
                Aliya_year,
                Father_birth_land,
                Mother_birth_land
            )} />
            <Button title="חזרה" onPress={() => navigation.navigate('PersonalForm2')} />
      
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
export default PersonalFormScreen3;