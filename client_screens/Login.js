import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import Spiner from '../Componentes/Spiner';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const url = "http://proj13.ruppin-tech.co.il/"
var bcrypt = require('bcryptjs');


export default function Login({ navigation }) {
  const [PersonalId, onChangeId] = useState()
  const [Email, onChangeEmail] = useState();
  const [Pass, onChangePass] = useState();
  const [Asaf, onChangeAsaf] = useState({ Personal_id: "204610620", First_name: "אסף", Last_name: "קרטן", Phone: "0549214258", Gender: "ז", Birthdate: "03.03.1993", Prev_first_name: "", Prev_last_name: "", City: "ranana", Address: "hertzel 101", Postal_code: "3355", Mail_box: "3", Telephone: "0549214258", Work_telephone: "", Blood_group_member: false, Personal_insurance: false, Confirm_examination: true, Agree_future_don: true, Birth_land: "ישראל", Aliya_year: "", Father_birth_land: "ישראל", Mother_birth_land: "ישראל" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getData();
    })()
  }, [])

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Done');
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () => {
    const data = await AsyncStorage.getItem('loggedUser')
    if (data !== null) {
      let user = JSON.parse(data)
    }
    else {
      navigation.navigate("Login");
    }
  }

  const storeData = async (data) => {
    try {
      const loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }


  const clientLogin = async () => {
    try {
      if (PersonalId === null || PersonalId === "" || Email === null || Email === "" || Pass === null || Pass === "") {
        Alert.alert("אנא מלא\י את כל פרטים !")
        return
      }
      else {
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
        var correct = bcrypt.compareSync(Pass, data.Salted_hash)
        if (!correct) {
          Alert.alert("הפרטים שגוים או שהסיסמה אינה נכונה!");
          return;
        }
        else {
          setLoading(true);
          await clearAsyncStorage();
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
          let user = await user_result.json();
          console.log(user);
          storeData(data);
          setLoading(false);
          navigation.navigate("PersonalForm", { route: user });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.input}
        onChangeText={() => onChangeId}
        value={PersonalId}
        placeholder="תעודת זהות"
      />
      <Input
        style={styles.input}
        onChangeText={() => onChangeEmail}
        value={Email}
        placeholder="אימייל"
      />
      <Input
        style={styles.input}
        onChangeText={() => onChangePass}
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
      <Spiner loading={loading} />

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
});
