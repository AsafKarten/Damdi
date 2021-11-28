import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, View, TouchableOpacity, Modal, Pressable, Alert, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../Utils';

var bcrypt = require('bcryptjs');

export default function PrivacyAndSecurity({ navigation, route }) {
  const [prevDetails, setPrev] = useState(route.params.route);
  const [email, onChangeEmail] = useState(prevDetails.Email);
  const [pass, onChangePass] = useState();
  const [cPass, onChangeCPass] = useState();
  const [userUpdated, onChangeUser] = useState();

  const [errorUpdate, setErrorUpdate] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);


  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const clearAsyncStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      console.log("clear async storage")
    } catch (error) {
      console.log(error, "error with clean async storage")
    }
    console.log('Done.')
  }

  const getUserInfo = async () => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: prevDetails.Personal_id
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

  const validationInput = async () => {
    if (email === "" || pass === "" || cPass === "") {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה')
      return
    }
    else if (pass === cPass) {
      let salt = bcrypt.genSaltSync(10);
      let saltedHash = bcrypt.hashSync(pass, salt);
      await clearAsyncStorage("loggedUser");
      await postEditDetiles(saltedHash);
    }
    else {
      Alert.alert("הסיסמא אינה תואמת נסי/ה הזן שוב")
      return
    }
  }


  const postEditDetiles = async (newSalt) => {
    try {
      let result = await fetch(url + "api/edit/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: prevDetails.Personal_id,
          Email: email,
          Salted_hash: newSalt,
        })
      });
      let res = await result.json();
      console.log(res);
      if (res === 'User updated successfully') {
        console.log("success modal");
        let updatedUser = await getUserInfo();
        onChangeUser(updatedUser);
        await storeData(updatedUser);
        setSuccessUpdate(true);
      }
      else {
        console.log("error modal");
        setErrorUpdate(true);
        return
      }
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.lableText}>עדכון אימייל וסיסמא</Text>
      <View style={styles.horizontalBox}>
        <Text style={styles.lableText}>אימייל</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="אימייל"
        />
      </View>
      <View style={styles.horizontalBox}>
        <Text style={styles.lableText}>סיסמא</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePass}
          value={pass}
          secureTextEntry={true}
          placeholder="סיסמא"
          maxLength={8}
        />
      </View>
      <View style={styles.horizontalBox}>
        <Text style={styles.lableText}>אשר סיסמא</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCPass}
          secureTextEntry={true}
          value={cPass}
          placeholder="אשר סיסמא"
          maxLength={8}
        />
      </View>
      <TouchableOpacity onPress={() => validationInput()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text}>שמור</Text>
        </View>
      </TouchableOpacity>
      {errorUpdate && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={errorUpdate}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>האימייל או הסיסמא שהכנסת שומשו בעבר, בחר אימייל או סיסמא שונים</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setErrorUpdate(!errorUpdate)}>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {successUpdate && (
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={successUpdate}
            onRequestClose={() => {
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>!הפרטים התעדכנו בהצלחה</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setSuccessUpdate(!successUpdate),
                      navigation.navigate("Profile", { route: userUpdated })
                  }}>
                  <Text style={styles.textStyle}>אישור</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inner: {
    flex: 1,
    justifyContent: "space-between"
  },
  input: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  button_normal: {
    alignItems: 'center',
    width: 80,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  horizontalBox: {
    width: 315,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  lableText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7d85b0'
  },
  //Modal
  modalView: {
    margin: 20,
    backgroundColor: '#757c94',
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});