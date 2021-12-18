import React, { useState } from 'react';
import { Image, View, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Spiner from '../Componentes/Spiner';
import BG_ONLY from '../assets/BG_ONLY.jpg';
import BG_LOGO_ONLY from '../assets/LOGO_ONLY_PNG.png';
import {url} from '../Utils'

var isaac = require('isaac');
var bcrypt = require('bcryptjs');
bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return buf.map(() => Math.floor(isaac.random() * 256));
});

export default function DonatorsLogin({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [personalId, onChangeId] = useState();
  const [pass, onChangePass] = useState();


  const getAutenticateDonator = async () => {
    try {
      if (Platform.OS !== 'web') {
        setLoading(true);
      }
      let result = await fetch(url + "api/donator", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id_worker: personalId,
        })
      });
      let donator = await result.json();
      if (donator !== undefined || donator !== null) {
        setLoading(false);
        return donator
      }
    } catch (error) {
      console.error(error, 'בעיה בשליפת פרטים של המשתמש בעת התחברות');
    }
  }

  const validationInput = (loadedUser) => {
    if (Platform.OS !== 'web') {
      setLoading(true);
    }
    if (personalId === "" || pass === "") {
      Alert.alert("שגיאת התחברות", "אנא מלא/י את כל פרטים !")
      console.log('====================================');
      console.log("Error, Empty fields");
      console.log('====================================');
      return
    }
    if (personalId !== loadedUser.Personal_id_worker) {
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



  const donatorLogin = async () => {
    try {
      let donator = await getAutenticateDonator();
      if (donator !== undefined || donator !== null) {
        let result = validationInput(donator);
        if (result === 'correct') {
          setLoading(false);
          navigation.navigate('DHome', { Donator: donator })
          onChangePass("")
          onChangeId("")
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
              <View style={styles.container}>
                
                <Image source={BG_LOGO_ONLY} style={styles.header_img} />

                <TextInput
                  style={styles.input}
                  onChangeText={onChangeId}
                  value={personalId}
                  placeholder="תעודת זהות"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePass}
                  value={pass}
                  secureTextEntry={true}
                  placeholder="סיסמה"
                />
                <TouchableOpacity onPress={() => donatorLogin()}>
                  <View style={styles.button_normal}>
                    <Text style={styles.button_text}>התחבר/י</Text>
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
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  BGimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title_text:{
      fontWeight: 'bold',
      fontSize: 34
  },
  input: {
    height: 40,
    width: 220,
    margin: 14,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
    height: 45,
    margin: 15,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  header_img: {
    marginBottom: 20,
    width: 310,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'stretch'
  }
});
