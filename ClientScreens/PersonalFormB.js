import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Spiner from '../Componentes/Spiner';


export default function PersonalFormB({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [User, setUser] = useState(route.params.route)

  const [City, onChangeCity] = useState();
  const [Address, onChangeAddress] = useState();
  const [Postal_code, onChangePostal_code] = useState();
  const [Mail_box, onChangeMail_box] = useState();
  const [Telephone, onChangeTelephone] = useState();
  const [Work_telephone, onChangeWork_telephone] = useState();

  useEffect(() => {
    (async () => {
      onChangeCity(User.City)
      onChangeAddress(User.Address)
      onChangePostal_code(User.Postal_code)
      onChangeMail_box(User.Postal_code)
      onChangeTelephone(User.Telephone)
      onChangeWork_telephone(User.Work_telephone)
    })()
  }, [])

  const PostPersonalFormB = async () => {
    if (City === '' || Address === '' || Postal_code === '' || Mail_box === '' || Telephone === '') {
      Alert.alert('אנא מלא/י את כל הפרטים בבקשה (לא חובה טלפון עבודה)')
      return
    }
    setLoading(true)
    User.City = City
    User.Address = Address
    User.Postal_code = Postal_code
    User.Mail_box = Mail_box
    User.Telephone = Telephone
    User.Work_telephone = Work_telephone
    navigation.navigate('PersonalFormC', { route: User })
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
                onChangeText={onChangeCity}
                value={City}
                placeholder="עיר"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>רחוב</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={Address}
                placeholder="רחוב"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מיקוד</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePostal_code}
                value={Postal_code}
                placeholder="מיקוד"
                keyboardType='numeric'
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>תיבת דואר</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={onChangeMail_box}
                value={Mail_box}
                placeholder="תיבת דואר"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מס טלפון</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={onChangeTelephone}
                value={Telephone}
                placeholder="מס טלפון"
              />
            </View>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>מס טלפון בעבודה</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeWork_telephone}
                value={Work_telephone}
                placeholder="מס טלפון בעבודה"
                keyboardType='numeric'
              />
            </View>
            <View style={styles.HorizontalBoxButtons}>
              <TouchableOpacity onPress={() => PostPersonalFormB() }>
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
            <Spiner loading={loading} />
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
    width: 120,
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
    color: 'white'
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
