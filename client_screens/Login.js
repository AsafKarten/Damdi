import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const uri = "http://ruppinmobile.tempdomain.co.il/site15/"
var bcrypt = require('bcryptjs');
export default function Login({ navigation }) {
  const [PersonalId, onChangeId] = useState()
  const [Email, onChangeEmail] = useState();
  const [Pass, onChangePass] = useState();


  const LoginNew = async () => {
    try {
        // if (PersonalId == null || PersonalId == "" || Email == null || Email == ""|| Pass == null || Pass == "") {
        //     Alert.alert("אנא מלא\י את כל פרטים !")
        //     return
        // }
        // else {
           
            let result = await fetch(uri + "api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Personal_id: PersonalId,
                    Email: Email
                })
            });
            let data = await result.json();
            console.log(data);
            var correct = bcrypt.compareSync(Pass, data.Solted_hash)
            if (!correct) {
                Alert.alert("הפרטים שגוים או שהסיסמה אינה נכונה!");
                return;
            }
            else {
               
                navigation.navigate("Welcome");
            }
        // }

    } catch (error) {
        console.log(error);
    }
}

    const Login = async () => {
    if (id == "" || email == "" || Pass == "") {
      alert("אנא מלא\י את כל פרטים !")
      return
    }
    else {
      let result = await fetch(uri + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
          Email: Email,
        })
      })
      let data = await result.JSON
      console.log(data);
      var correct = bcrypt.compareSync(Pass, data.Salted_hash)
      if (!correct) {
        Alert.alert("Wrong details,check your details");
        return;
      }
      console.log(data);
      navigation.navigate("Welcome")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={()=>onChangeId}
        value={PersonalId}
        placeholder="תעודת זהות"
      />
      <TextInput
        style={styles.input}
        onChangeText={()=>onChangeEmail}
        value={Email}
        placeholder="אימייל"
      />
      <TextInput
        style={styles.input}
        onChangeText={()=>onChangePass}
        value={Pass}
        secureTextEntry={true}
        placeholder="סיסמה"
      />
      <TouchableOpacity onPress={() => LoginNew()}>
        <View style={styles.button_normal}>
          <Text >התחברות</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <View style={styles.button_normal}>
          <Text >הרשמה</Text>
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
