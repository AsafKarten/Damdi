import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

var bcrypt = require('bcryptjs');
const url = "http://proj13.ruppin-tech.co.il/"


export default function PrivacyAndSecurity({ navigation, route }) {
  const [prevDetails, setPrev] = useState(route.params.route);
  const [Email, onChangeEmail] = useState(route.params.route.Email);
  const [Pass, onChangePass] = useState();
  const [CPass, onChangeCPass] = useState();
  const [Salt, onChangeSalt] = useState();
  const [shouldShow, setShouldShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      console.log('Done clear storage');
    } catch (error) {
      console.log(error);
    }
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

  const CheckDetails = async () => {
    try {
      if (Platform.OS !== 'web') {
        setShouldShow(true)
      }
      let result = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: prevDetails.Personal_id,
          Email: prevDetails.Email
        })
      });
      let currentUser = await result.json();
      console.log(currentUser);
      if (currentUser.Personal_id == prevDetails.Personal_id) {
        postEditDetiles()
      }
      if (currentUser.Salted_hash == prevDetails.Salted_hash || currentUser.Email == prevDetails.Email && currentUser.Personal_id !== prevDetails.Personal_id) {
        setModalVisible(true)
      }
      else {
        postEditDetiles()
      }
    } catch (e) {
      console.error(e);
    }
  }



  const postEditDetiles = async () => {
    try {
      if (!Pass == '') {
        if (Pass == CPass) {
          let salt = bcrypt.genSaltSync(10);
          let saltedHash = bcrypt.hashSync(Pass, salt);
          onChangeSalt(saltedHash);
        }
      }
      else {
        Alert.alert("הסיסמא אינה תואמת נסי/ה הזן שוב")
      }
      await clearAsyncStorage();
      let result = await fetch(url + "api/edit/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: prevDetails.Personal_id,
          Email: Email,
          Salted_hash: Salt,
        })
      });
      let res = await result.json();
      if (res !== null || res !== undefined) {
        let updatedUser = await getUserInfo();
        await storeData(updatedUser);
        navigation.navigate("Profile", { route: updatedUser });
      }
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <View style={styles.container}>
      <Text>עדכון אימייל וסיסמא</Text>
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
        placeholder="סיסמא"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeCPass}
        secureTextEntry={true}
        value={CPass}
        placeholder="אשר סיסמא"
      />
      <TouchableOpacity onPress={() => CheckDetails()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text}>שמור</Text>
        </View>
      </TouchableOpacity>
      {shouldShow ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>האימייל או הסיסמא שהכנסת קיימים, בחר אימייל או סיסמא שונים</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center'
  },
  button_text: {
    color: 'white'
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
  //Modal style
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
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});