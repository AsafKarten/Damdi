import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';
//const ilCities = require('../assets/il.json');


export default function PersonalFormB({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [User, setUser] = useState(route.params.route)

  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [mailBox, setMailBox] = useState();
  const [telephone, setTelephone] = useState();
  const [workTelephone, setWorkTelephone] = useState();

  useEffect(() => {
    setCity(User.City)
    setAddress(User.Address)
    setPostalCode(User.Postal_code)
    setMailBox(User.Postal_code)
    setTelephone(User.Telephone)
    setWorkTelephone(User.Work_telephone)
  }, [])

  const PostPersonalFormB = async () => {
    if (city === '' || address === '' || postalCode === '' || mailBox === '' || telephone === '') {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה (לא חובה טלפון עבודה)')
      return
    }
    setLoading(true)
    User.City = city
    User.Address = address
    User.Postal_code = postalCode
    User.Mail_box = mailBox
    User.Telephone = telephone
    User.Work_telephone = workTelephone
    var UserB = {Personal_id : route.params.route.Personal_id, First_name : route.params.route.First_name, Last_name: route.params.route.Last_name,Phone:route.params.route.Phone, Gender : route.params.route.Gender, Birthdate: route.params.route.Birthdate, Prev_first_name: route.params.route.Prev_first_name, Prev_last_name: route.params.route.Prev_last_name,
      City: city, Address:address, Postal_code: postalCode, Mail_box:mailBox, Telephone:telephone, Work_telephone:workTelephone}
    console.log("PersonalFormB",UserB);
    setLoading(false);
    navigation.navigate('PersonalFormC', { route: UserB })
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>עיר</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCity}
                value={city}
                placeholder="עיר"
                maxLength={20}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>רחוב</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAddress}
                value={address}
                placeholder="רחוב"
                maxLength={30}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מיקוד</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPostalCode}
                value={postalCode}
                placeholder="מיקוד"
                keyboardType='numeric'
                maxLength={7}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>תיבת דואר</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setMailBox}
                value={mailBox}
                placeholder="תיבת דואר"
                maxLength={6}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מס טלפון</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setTelephone}
                value={telephone}
                placeholder="מס טלפון"
                maxLength={9}
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מס טלפון בעבודה</Text>
              <TextInput
                style={styles.input}
                onChangeText={setWorkTelephone}
                value={workTelephone}
                placeholder="מס טלפון בעבודה"
                keyboardType='numeric'
                maxLength={9}
              />
            </View>
            <View style={styles.HorizontalBoxButtons}>
              <TouchableOpacity onPress={() => {
                setLoading(false)
                PostPersonalFormB()
              }}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >הבא</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('PersonalFormA')} >
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} >חזרה</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    padding: 50,
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    width: 140,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_normal: {
    alignItems: 'center',
    width: 110,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  HorizontalBoxButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lableText: {
    marginTop: 17,
    fontWeight: 'bold'
  },
});
