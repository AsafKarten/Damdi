import React, { useState, useEffect } from 'react';
import { Modal, Platform, View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, TouchableHighlight, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';

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
  const [shouldShow, setShouldShow] = useState(false);
  const [confirmModal, setConfirm] = useState(false);
  const [Asaf, onChangeAsaf] = useState({ Personal_id: "204610620", First_name: "אסף", Last_name: "קרטן", Phone: "0549214258", Gender: "ז", Birthdate: "03.03.1993", Prev_first_name: "", Prev_last_name: "", City: "ranana", Address: "hertzel 101", Postal_code: "3355", Mail_box: "3", Telephone: "0549214258", Work_telephone: "", Blood_group_member: false, Personal_insurance: false, Confirm_examination: true, Agree_future_don: true, Birth_land: "ישראל", Aliya_year: "", Father_birth_land: "ישראל", Mother_birth_land: "ישראל" });
  const [User, setUser] = useState()

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        setShouldShow(true)
      }
      await getData();
    })()
  }, [])

  const getData = async () => {
    var loggedUser = await AsyncStorage.getItem('loggedUser')
    if (loggedUser !== null) {
      console.log(loggedUser);
      var user = JSON.parse(loggedUser)
      setUser(user);
      await updateLoggedUser();
      //navigation.navigate("Welcome", { route: user });
    }
    else {
      navigation.navigate("Login");
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

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('clear AsyncStorage = Done');
    } catch (error) {
      console.log(error);
    }
  }

  const updateLoggedUser = async () => {
    try {
      await clearAsyncStorage()
      let result = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: User.Personal_id,
          Email: User.Email
        })
      });
      let updated_user = await result.json();
      // if (data.User_img.indexOf("?asid") == -1)
      //   data.User_img = `${data.User_img}?t=${Date.now()}`;
      setUser(updated_user)
      storeData(updated_user);
      if (Platform.OS !== 'web') {
        setLoading(false);
        setConfirm(true)
      }
      //navigation.navigate("Welcome", { route: user });
    } catch (e) {
      console.error(e);
    }
  }


  const clientLogin = async () => {
    try {
      if (PersonalId == null || PersonalId == "" || Email == null || Email == "" || Pass == null || Pass == "") {
        Alert.alert("שגיאת התחברות", "אנא מלא/י את כל פרטים !")
        console.log('====================================');
        console.log("Error, Empty fields");
        console.log('====================================');
        return
      }
      else {
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
            Personal_id: PersonalId,
            Email: Email
          })
        });
        let data = await result.json();
        console.log(data);
        if (Email !== data.Email || PersonalId !== data.Personal_id) {
          setLoading(false);
          Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
          return;
        }
        var correct = bcrypt.compareSync(Pass, data.Salted_hash)
        if (!correct) {
          setLoading(false);
          Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
          return;
        }
        else {
          let user_result = await fetch(url + "api/user/info", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              Personal_id: PersonalId,
            })
          });
          const user = await user_result.json();
          storeData(user);
          if (Platform.OS !== 'web') {
            setConfirm(true);
          }

          //navigation.navigate("PersonalForm", { route: user });
        }
      }
    } catch (error) {
      console.log(error);
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
            <TouchableOpacity onPress={() => navigation.navigate('DonatorsLogin')}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >כניסת מתרימים</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PersonalForm', { route: Asaf })}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >הכפתור של אסף</Text>
              </View>
            </TouchableOpacity>

            {shouldShow ? (
              <Modal
                animationType="fade"
                transparent={true}
                visible={confirmModal}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View >
                  <View style={styles.button_container}>
                    <Text>כדי לעדכן פרטים אישיים לחץ על "כן", כדי להמשיך לחץ על "לא" </Text>
                    <TouchableHighlight
                      style={{ backgroundColor: '#4d5b70' }}
                      onPress={() => {
                        navigation.navigate("PersonalForm", { route: User });
                      }}>
                      <Text>כן</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={{ backgroundColor: '#4d5b70' }}
                      onPress={() => {
                        navigation.navigate("Welcome", { route: User });
                      }}>
                      <Text>לא</Text>
                    </TouchableHighlight>
                  </View>
                  <TouchableHighlight
                    style={{ backgroundColor: '#4d5b70' }}
                    onPress={() => {
                      setConfirm(!confirmModal);
                    }}>
                    <Text>סגור</Text>
                  </TouchableHighlight>
                </View>
              </Modal>
            ) : null}
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
    padding: 40,
    flex: 1,
    justifyContent: "space-around"
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
  button_text: {
    color: 'white'
  },
  button_container: {
    flexDirection: 'row'
  },
});
