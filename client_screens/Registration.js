import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Button, TouchableOpacity } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"
var bcrypt = require('bcryptjs');

export default function Registration({ navigation }) {
    const defaultImg = "http://ruppinmobile.tempdomain.co.il/site15/Assets/DamdiPI4.png"
    const [PersonalId, onChangeId] = useState();
    const [Email, onChangeEmail] = useState();
    const [Pass, onChangePass] = useState();
    const [CPass, onChangeCPass] = useState();

    const SignUp = async () => {
        try {
            if (Pass != CPass) {
                alert("סיסמא אינה תואמת, אנא בדוק פרטיך!");
                return
            }
            else if (PersonalId === null || PersonalId === "" || Email === null || Email === "" || Pass === null || Pass === "" || CPass === null || CPass === "") {
                alert("אנא מלא/י את כל השדות");
                return
            }
            else {
                let salt = await bcrypt.genSaltSync(10);
                let saltedHash = await bcrypt.hashSync(Pass, salt);
                let result = await fetch(url + "api/add/post", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        Personal_id: PersonalId,
                        Email: Email,
                        Salted_hash: saltedHash,
                        Profile_img: defaultImg
                    })
                })
                let data = await result.JSON
                console.log(data)
                navigation.navigate('Login')
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (

        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeId}
                value={PersonalId}
                placeholder="תעודת זהות"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={Email}
                placeholder="אימייל"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePass}
                value={Pass}
                secureTextEntry={true}
                placeholder="סיסמה"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeCPass}
                secureTextEntry={true}
                value={CPass}
                placeholder="אשר סיסמה"
            />
            <TouchableOpacity onPress={() => SignUp()}>
                <View style={styles.button_normal}>
                    <Text >סיים הרשמה</Text>
                </View>
            </TouchableOpacity>
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
        width: 160,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
    },
    button_normal: {

        alignItems: 'center',
        margin: 15,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#633689"
    },
});
