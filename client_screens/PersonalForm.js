import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"


const PersonalFormScreen = ({ navigation , personal_id }) => {
    const [First_name, onChangeFirst_name] = React.useState();
    const [Last_name, onChangeLast_name] = React.useState();
    const [Phone, onChangePhone] = React.useState();
    const [Gender, onChangeGender] = React.useState();
    const [Birthdate, onChangeBirthdate] = React.useState();
    const [Prev_first_name, onChangePrev_first_name] = React.useState();
    const [Prev_last_name, onChangePrev_last_name] = React.useState();
 
    const PostPersonalForm=(
        personal_id,
        First_name,
        Last_name,
        Phone, 
        Gender,
        Birthdate,
        Prev_first_name,
        Prev_last_name,
        )=>{
            const userInfo={
                personal_id,
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
                    personal_id,
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
