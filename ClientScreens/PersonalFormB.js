import React, { useEffect, useState } from 'react';
import Spiner from '../Componentes/Spiner';
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';




export default function PersonalFormB({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showCityList, setShowCityList] = useState(true);
  const [showAddressList, setShowAddressList] = useState(true);
  const [User, setUser] = useState(route.params.route)

  const [city, setCity] = useState(route.params.route.City);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(route.params.route.Address);
  const [postalCode, setPostalCode] = useState(route.params.route.Postal_code);
  const [mailBox, setMailBox] = useState(route.params.route.Mail_box);
  const [telephone, setTelephone] = useState(route.params.route.Telephone);
  const [workTelephone, setWorkTelephone] = useState(route.params.route.Work_telephone);

  useEffect(() => {
    // setCity(User.City)
    // setAddress(User.Address)
    // setPostalCode(User.Postal_code)
    // setMailBox(User.Postal_code)
    // setTelephone(User.Telephone)
    // setWorkTelephone(User.Work_telephone)
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
    var UserB = {
      Personal_id: route.params.route.Personal_id, First_name: route.params.route.First_name, Last_name: route.params.route.Last_name, Phone: route.params.route.Phone, Gender: route.params.route.Gender, Birthdate: route.params.route.Birthdate, Prev_first_name: route.params.route.Prev_first_name, Prev_last_name: route.params.route.Prev_last_name,
      City: city, Address: address, Postal_code: postalCode, Mail_box: mailBox, Telephone: telephone, Work_telephone: workTelephone
    }
    console.log("PersonalFormB", UserB);
    setLoading(false);
    navigation.navigate('PersonalFormC', { route: UserB })
  }

  const searchAddress = async (q) => {
    let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&q=${q}`
    let res = await fetch(url);
    let data = await res.json();
    console.log(data.result.records);
    setAddresses(data.result.records)
  }

  const onFocusAddress = () => {
    setShowAddressList(true);
    setAddresses([])
  }

  useEffect(() => {
    searchAddress(address)
  }, [address])

  const serachCity = async (q) => {
    let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=351d4347-8ee0-4906-8e5b-9533aef13595&q=${q}`
    let res = await fetch(url);
    let data = await res.json();
    console.log(data.result.records);
    setCities(data.result.records)
  }

  const onFocusCities = () => {
    setShowAddressList(false);
    setShowCityList(true);
    setCities([])
  }

  useEffect(() => {
    serachCity(city)
  }, [city])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>עיר</Text>
              <TextInput
                onFocus={onFocusCities}
                style={styles.input}
                onChangeText={setCity}
                value={city}
                placeholder="עיר"
                maxLength={20}
              />
            </View>
            <View style={styles.container_city_list}>
              {cities.length > 0 ? cities.map(item =>
                <TouchableOpacity onPress={() => {
                  setCity(item["שם יישוב"])
                  setShowCityList(false)
                }} >
                  {showCityList && <View style={styles.button_city_list}>
                    <Text style={styles.text_city_list}>{item["שם יישוב"]}</Text>
                  </View>}
                </TouchableOpacity>)
                : null}
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>רחוב</Text>
              <TextInput
                onFocus={onFocusAddress}
                style={styles.input}
                onChangeText={setAddress}
                value={address}
                placeholder="רחוב"
                maxLength={30}
              />
            </View>
            <View style={styles.container_city_list}>
              {addresses.length > 0 ? addresses.map(item =>
                <TouchableOpacity onPress={() => {
                  setAddress(item["street_name"])
                  setShowAddressList(false)
                }} >
                  {showAddressList && <View style={styles.button_city_list}>
                    <ScrollView>
                      <Text style={styles.text_city_list}>{item["street_name"]}</Text>
                    </ScrollView>
                  </View>}
                </TouchableOpacity>)
                : null}
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
              {loading && <Spiner loading={loading} />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
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
  container_city_list: {
    marginRight: 125,
  },
  button_city_list: {
    borderWidth: 2
  },
  text_city_list: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  }
});
