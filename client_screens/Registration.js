import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';


const url = "http://proj13.ruppin-tech.co.il/"
var bcrypt = require('bcryptjs');

export default function Registration({ navigation }) {
  const defaultImg = "http://proj13.ruppin-tech.co.il/Assets/DamdiPI4.png"
  const [PersonalId, onChangeId] = useState();
  const [Email, onChangeEmail] = useState();
  const [Pass, onChangePass] = useState();
  const [CPass, onChangeCPass] = useState();
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }


  const SignUp = async () => {
    try {
      if (Pass != CPass) {
        Alert.alert("שגיאת סיסמא", "סיסמא אינה תואמת, אנא בדוק פרטיך!");
        return
      }
      else if (PersonalId == null || PersonalId == "" || Email == null || Email == "" || Pass == null || Pass == "" || CPass == null || CPass == "") {
        Alert.alert("אנא מלא/י את כל השדות");
        console.log('====================================');
        console.log("Error, Empty fields");
        console.log('====================================');
        return
      }
      else {
        if (Platform.OS !== 'web') {
          setShouldShow(true)
          setLoading(true);
        }
        let salt = bcrypt.genSaltSync(10);
        let saltedHash = bcrypt.hashSync(Pass, salt);
        let result_register = await fetch(url + "api/add/user", {
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
        let new_data = await result_register.json()
        console.log(new_data)
        let result_user = await fetch(url + "api/user", {
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
        let user = await result_user.json();
        storeData(user)
        navigation.navigate("PersonalForm", { route: user  })
        setLoading(false)
      }
    } catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
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
            {shouldShow ? (
              <Spiner loading={loading} />
            ) : null}
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
    justifyContent: "space-around"
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
