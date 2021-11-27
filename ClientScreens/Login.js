import React, { useState, useEffect } from 'react';
import { Platform, ImageBackground, View, BackHandler, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';
import BG_ONLY from '../assets/BG_ONLY.jpg';
import { url } from '../Utils';

var isaac = require('isaac');
var bcrypt = require('bcryptjs');

bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return buf.map(() => Math.floor(isaac.random() * 256));
});

export default function Login({ navigation }) {
  const [personalId, onChangeId] = useState()
  const [email, onChangeEmail] = useState()
  const [pass, onChangePass] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [navigation])

  useEffect(() => {
    const backAction = () => {
      Alert.alert("רגע רגע", "בטוח שאת/ה רוצה לצאת מהאפליקציה?!", [
        {
          text: "ביטול",
          onPress: () => null,
          style: "cancel"
        },
        { text: "כן", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const getData = async () => {
    try {
      let loggedUser = await AsyncStorage.getItem('loggedUser')
      if (loggedUser !== null) {
        let existUser = JSON.parse(loggedUser)
        console.log("Login 54", existUser);
        navigation.navigate('PersonalFormA', { route: existUser, modalStatus: "update" })
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

  const getAutenticateUser = async () => {
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
          Personal_id: personalId,
          Email: email
        })
      });
      let user = await result.json();
      if (user !== undefined || user !== null) {
        setLoading(false);
        return user
      }
    } catch (error) {
      console.error(error, 'בעיה בשליפת פרטים של המשתמש בעת התחברות');
    }
  }

  const validationInput = (loadedUser) => {
    if (Platform.OS !== 'web') {
      setLoading(true);
    }
    if (personalId === "" || email === "" || pass === "") {
      Alert.alert("שגיאת התחברות", "אנא מלא/י את כל פרטים !")
      console.log('====================================');
      console.log("Error, Empty fields");
      console.log('====================================');
      return
    }
    if (email !== loadedUser.Email || personalId !== loadedUser.Personal_id) {
      setLoading(false);
      console.log("error with email or id");
      return;
    }
    var correct = bcrypt.compareSync(pass, loadedUser.Salted_hash)
    if (!correct) {
      setLoading(false);
      console.log("error with password");
      return;
    }
    else {
      return "correct"
    }
  }


  const clientLogin = async () => {
    try {
      let updatedUser = await getAutenticateUser();
      if (updatedUser !== undefined || updatedUser !== null) {
        let result = validationInput(updatedUser)
        if (result === 'correct') {
          setLoading(false);
          await storeData(updatedUser)
          navigation.navigate('PersonalFormA', { route: updatedUser, modalStatus: 'update' })
        }
        else {
          Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
          return
        }
      }
      else {
        setLoading(false);
        Alert.alert("בעיית התחברות, הירשם או בדוק את פרטיך")
        return
      }
    } catch (error) {
      console.log(error, "בעיה בשליפת הפרטים");
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
                value={personalId}
                placeholder="תעודת זהות"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="אימייל"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePass}
                value={pass}
                secureTextEntry={true}
                placeholder="סיסמה"
              />
              <TouchableOpacity onPress={() => {
                setLoading(false);
                clientLogin()
              }}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text}>התחברות</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >הרשמה</Text>
                </View>
              </TouchableOpacity>
              {loading && <Spiner loading={loading} />}
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
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  BGimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
