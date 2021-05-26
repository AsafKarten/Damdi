import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"


const PersonalFormScreen = ({ navigation }) => {
    const [PersonalId, onChangeId] = React.useState();
    const [Email, onChangeEmail] = React.useState();
    const [Pass, onChangePass] = React.useState();
    const [CPass, onChangeCPass] = React.useState();

    const SignUp = (id, Email, Pass, CPass) => {
        if (Pass != CPass) {
            alert("Password dos not match confirm password!");
            return
        }
        else if (id == null || id == "" || Email == null || Email == "" || Pass == null || Pass == "" || CPass == null || CPass == "") {
            alert("Please fill all the fildes");
            return
        }
        else {
            fetch(url + "api/user/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Personal_id: id,
                    Email: Email,
                    Pass: Pass
                })
            })
                .then(res => {
                    console.log('res=', res);
                    return res.json()
                })
                .then(
                    (result) => {
                        console.log(result);
                        console.log(result.Personal_id);
                        console.log(result.Email);
                        navigation.navigate("Login");
                    },
                    (error) => {
                        console.log(error);
                    });
        }
    }

<<<<<<< HEAD
=======
export default function PersonalForm({navigation}) {
>>>>>>> bd188d8678bb01cb41aed0356988ecd6a75fa360
    return (

        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeId}
                value={PersonalId}
                placeholder="I.D"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={Email}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePass}
                value={Pass}
                placeholder="Password"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeCPass}
                value={CPass}
                placeholder="Confirm Pass"
            />
            <Button
                title="SignUp"
                onPress={() => SignUp(PersonalId, Email, Pass, CPass)}

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
