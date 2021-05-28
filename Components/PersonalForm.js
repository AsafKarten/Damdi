import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"


const PersonalFormScreen = ({ navigation , route }) => {
    const [First_name, onChangeFirst_name] = React.useState();
    const [Last_name, onChangeLast_name] = React.useState();
    const [Phone, onChangePhone] = React.useState();
    const [Gender, onChangeGender] = React.useState();
    const [Birthdate, onChangeBirthdate] = React.useState();
    const [Prev_first_name, onChangePrev_first_name] = React.useState();
    const [Prev_last_name, onChangePrev_last_name] = React.useState();
 

    // const PostPersonalForm = (
    //      First_name,
    //      Last_name,
    //      Phone, 
    //      Gender,
    //      Birthdate,
    //      Prev_first_name,
    //      Prev_last_name
         
    //      ) => {
    //     if (Pass != CPass) {
    //         alert("Password dos not match confirm password!");
    //         return
    //     }
    //     else if (id == null || id == "" || Email == null || Email == "" || Pass == null || Pass == "" || CPass == null || CPass == "") {
    //         alert("Please fill all the fildes");
    //         return
    //     }
    //     else {
    //         fetch(url + "api/user/post", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json; charset=UTF-8',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 Personal_id: id,
    //                 Email: Email,
    //                 Pass: Pass
    //             })
    //         })
    //             .then(res => {
    //                 console.log('res=', res);
    //                 return res.json()
    //             })
    //             .then(
    //                 (result) => {
    //                     console.log(result);
    //                     console.log(result.Personal_id);
    //                     console.log(result.Email);
    //                     navigation.navigate("Login");
    //                 },
    //                 (error) => {
    //                     console.log(error);
    //                 });
    //     }
    // }

    return (

        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeFirst_name}
                value={First_name}
                placeholder="First name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeLast_name}
                value={Last_name}
                placeholder="Last name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={Phone}
                placeholder="Phone"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeGender}
                value={Gender}
                placeholder="Gender"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeBirthdate}
                value={Birthdate}
                placeholder="Birthdate"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePrev_first_name}
                value={Prev_first_name}
                placeholder="Prev first name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePrev_last_name}
                value={Prev_last_name}
                placeholder="Prev last name"
            />
           
           <Button onPress={()=> navigation.navigate('PersonalForm2')}/>
           
            {/* <Button
                title="next"
                onPress={() => PostPersonalForm(
                    First_name,
                    Last_name,
                    Phone, 
                    Gender,
                    Birthdate,
                    Prev_first_name,
                    Prev_last_name,
                    )}
            /> */}
           
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
