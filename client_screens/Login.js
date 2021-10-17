import React, { useState, useEffect } from 'react';
import { Platform, ImageBackground, View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';
import BG_ONLY from '../assets/BG_ONLY.jpg';

const url = "http://proj13.ruppin-tech.co.il/"

var isaac = require('isaac');
var bcrypt = require('bcryptjs');
bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return buf.map(() => Math.floor(isaac.random() * 256));
});

export default function Login({ navigation }) {
  const [PersonalId, onChangeId] = useState()
  const [Email, onChangeEmail] = useState()
  const [Pass, onChangePass] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getData();
    })()
  }, [])

  const getData = async () => {
    try {
      let loggedUser = await AsyncStorage.getItem('loggedUser')
      if (loggedUser !== null) {
        let existUser = JSON.parse(loggedUser)
        navigation.navigate('PersonalFormA', { route: existUser })
      }
      else {
        console.log('No user found on setion storage');
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const getAutenticateUser = async (personal_id, email) => {
    try {
      if (Platform.OS !== 'web') {
        setLoading(true);
      }
      let result = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personal_id,
          Email: email
        })
      });
      let user = await result.json();
      if (user !== undefined || user !== null) {
        setLoading(false);
        return user
      }
    } catch (error) {
      console.error('user not authenticated');
    }
  }

  const getUserInfo = async (personal_id) => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personal_id,
        })
      });
      let full_user = await result.json();
      if (full_user !== undefined || full_user !== null) {
        return full_user
      }
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const clientLogin = async () => {
    try {
      if (PersonalId === "" || Email === "" || Pass === "") {
        Alert.alert("שגיאת התחברות", "אנא מלא/י את כל פרטים !")
        console.log('====================================');
        console.log("Error, Empty fields");
        console.log('====================================');
        return
      }
      else {
        let updatedUser = await getAutenticateUser(PersonalId, Email);
        if (updatedUser !== undefined || updatedUser !== null) {
          if (Email !== updatedUser.Email || PersonalId !== updatedUser.Personal_id) {
            setLoading(false);
            Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
            console.log("error with email or id");
            return;
          }
          var correct = bcrypt.compareSync(Pass, updatedUser.Salted_hash)
          if (!correct) {
            setLoading(false);
            Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
            console.log("error with password");
            return;
          }
          storeData(updatedUser)
          let fullUpdatedUser = await getUserInfo(updatedUser.Personal_id);
          if (
            fullUpdatedUser.First_name === null ||
            fullUpdatedUser.Last_name === null ||
            fullUpdatedUser.Phone === null ||
            fullUpdatedUser.Gender === null ||
            fullUpdatedUser.Birthdate === null ||
            fullUpdatedUser.City === null ||
            fullUpdatedUser.Address === null ||
            fullUpdatedUser.Postal_code === null ||
            fullUpdatedUser.Mail_box === null ||
            fullUpdatedUser.Telephone === null ||
            fullUpdatedUser.Confirm_examination === null ||
            fullUpdatedUser.Birth_land === null ||
            fullUpdatedUser.Father_birth_land === null ||
            fullUpdatedUser.Mother_birth_land === null) {
            setLoading(false);
            Alert.alert("אנא מלא/י את כל הפרטים כדי לתרום!")
            navigation.navigate('PersonalFormA', { route: fullUpdatedUser })
          }
          navigation.navigate('PersonalFormA', { route: fullUpdatedUser })

        }
        else {
          setLoading(false);
          Alert.alert("בעיית התחברות, הירשם או בדוק את פרטיך")
          return
        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <ImageBackground source={BG_ONLY} style={styles.BGimage}>
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
              <TouchableOpacity onPress={() => clientLogin()}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text}>התחברות</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >הרשמה</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.reg_btn}>
                <TouchableOpacity onPress={() => navigation.navigate('DonatorsLogin')}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text} >כניסת מתרימים</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Spiner loading={loading} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 40,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center'
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  reg_btn: {
    marginTop: 20,
  },
  button_text: {
    color: 'black'
  },
  BGimage: {
    // alignSelf: 'center',
    // resizeMode: 'stretch'
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
