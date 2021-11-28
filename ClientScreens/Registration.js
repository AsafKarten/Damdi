import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';
import { url } from '../Utils';


var bcrypt = require('bcryptjs');

export default function Registration({ navigation }) {
  const defaultImg = "../assets/fix_drop2.png"
  const [personalId, onChangeId] = useState();
  const [email, onChangeEmail] = useState();
  const [pass, onChangePass] = useState();
  const [confirmPass, onChangeCPass] = useState();
  const [loading, setLoading] = useState(false);

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const validationInput = () => {
    if (Platform.OS !== 'web') {
      setLoading(true);
    }
    var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pasRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (personalId == null || personalId == "" || email == null || email == "" || pass == null || pass == "" || confirmPass == null || confirmPass == "") {
      Alert.alert("אנא מלא/י את כל השדות");
      console.log('====================================');
      console.log("Error, Empty fields");
      console.log('====================================');
      return
    }
    if (!(emailregex.test(email))) {
      Alert.alert("אופס", "האימייל שהוכנס לא חוקי אנא נסה בפורמט הבא: name@example.com")
      onChangeEmail("")
      return
    }
    if (!(pasRegex.test(pass))) {
      Alert.alert("סיסמא לא חוקית", "הסיסמה צריכה להכיל לפחות: 8 תווים , אות גדולה , אות קטנה ,תו , ומספר")
      onChangePass("")
      return
    }
    if (pass !== confirmPass) {
      Alert.alert("שגיאת סיסמא", "הסיסמאות אינם תואמות, אנא הזן שנית!");
      onChangePass("")
      onChangeCPass("")
      return
    }
    else {
      SignUp();
    }
  }


  const GetUserFormDB = async () => {
    try {
      let result_user = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personalId,
          Email: email
        })
      });
      let user = await result_user.json();
      await storeData(user)
      navigation.navigate("PersonalFormA", { route: user, modalStatus: "info" })
    } catch (error) {
      Alert.alert("בעיה בשרת,משתמש אינו נרשם במערכת, נסה מאוחר יותר", "שגיאה")
    }
  }



  const SignUp = async () => {
    try {
      let salt = bcrypt.genSaltSync(10);
      let saltedHash = bcrypt.hashSync(pass, salt);
      let result_register = await fetch(url + "api/add/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personalId,
          Email: email,
          Salted_hash: saltedHash,
          Profile_img: defaultImg
        })
      })
      let rsponse = await result_register.json()
      if (rsponse == 'User created successfully') {
        GetUserFormDB();
      }
    }
    catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.horizontalBox}>
              <Text style={styles.lableText}> תעודת זהות </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeId}
                value={personalId}
                placeholder="תעודת זהות"
                maxLength={9}
              />
            </View>
            <View style={styles.horizontalBox}>
              <Text style={styles.lableText}> אימייל </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="אימייל"
              />
            </View>
            <View style={styles.horizontalBox}>
              <Text style={styles.lableText}> סיסמה </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePass}
                value={pass}
                secureTextEntry={true}
                placeholder="סיסמה"
                maxLength={8}
              />
            </View>
            <View style={styles.horizontalBox}>
              <Text style={styles.lableText}> אשר סיסמה </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeCPass}
                secureTextEntry={true}
                value={confirmPass}
                placeholder="אשר סיסמה"
                maxLength={8}
              />
            </View>
            <TouchableOpacity onPress={() => {
              setLoading(false)
              validationInput()
            }}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text}>סיים הרשמה</Text>
              </View>
            </TouchableOpacity>
            {loading && <Spiner loading={loading} />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 60,
    flex: 1,
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 210,
    margin: 14,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
    margin: 15,
    marginLeft: 42,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
    marginTop: 30,
    marginLeft: 37
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  horizontalBox: {
    width: 330,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  lableText: {
    marginTop: 19,
    fontSize: 16,
    fontWeight: 'bold'
  }
});