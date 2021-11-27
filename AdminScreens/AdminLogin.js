import React, { useState } from 'react';
import { View, SafeAreaView, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Spiner from '../Componentes/Spiner';
import BG_ONLY from '../assets/BG_ONLY.jpg';

const url = "http://proj13.ruppin-tech.co.il/"

var isaac = require('isaac');
var bcrypt = require('bcryptjs');
bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return buf.map(() => Math.floor(isaac.random() * 256));
});

export default function AdminLogin({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [PersonalId, onChangeId] = useState();
  const [Pass, onChangePass] = useState();

  const getAutenticateAdmin = async (id) => {
    try {
      if (Platform.OS !== 'web') {
        setLoading(true);
      }
      let result = await fetch(url + "api/admin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: id,
        })
      });
      let admin = await result.json();
      if (admin !== undefined || admin !== null) {
        setLoading(false);
        console.log(admin);
        return admin
      }
    } catch (error) {
      console.error('donator not authenticated');
    }
  }


  const adminLogin = async () => {
    try {
      if (PersonalId === "" || Pass === "") {
        Alert.alert("שגיאת התחברות", "אנא מלא/י את כל פרטים !")
        console.log('====================================');
        console.log("Error, Empty fields");
        console.log('====================================');
        return
      }
      const admin = await getAutenticateAdmin(PersonalId);
      if (admin !== undefined || admin !== null) {
        if (PersonalId !== admin.Personal_id) {
          setLoading(false);
          Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
          console.log("error with id");
          return;
        }
        const correct = bcrypt.compareSync(Pass, admin.Salted_hash)
        if (!correct) {
          setLoading(false);
          Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
          console.log("error with password");
          return;
        }
        navigation.navigate('AdminHome', { route: admin })
      }
      else {
        setLoading(false);
        Alert.alert("בעיית התחברות, בדוק את פרטיך")
        return
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
                onChangeText={onChangePass}
                value={Pass}
                secureTextEntry={true}
                placeholder="סיסמה"
              />
              <TouchableOpacity onPress={() => adminLogin(PersonalId, Pass)}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text}>התחברות</Text>
                </View>
              </TouchableOpacity>
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
  BGimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  inner: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
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
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
    marginLeft: 44
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
})