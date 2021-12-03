import React, { useState, useEffect } from 'react';
import { View, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function PersonalInfo({ navigation, route }) {
  const [Donator, setDonator] = useState(route.params.route.Donator);
  const [donor, setDonor] = useState(route.params.route.Donor);
  const [showText, setShowText] = useState(false);
  const [textInput, onChangeTextInput] = useState()

  let birthDate = new Date(donor.Birthdate);
  var fDate = birthDate.getDate() + '/' + (birthDate.getMonth() + 1) + '/' + birthDate.getFullYear()

  //TODO: Save notes to DB to MedicalInfoDonator
  const saveNotes = async () => {
    try {
      setShowText(false)
      Alert.alert("ההערות נשמרו בהצלחה")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.infoBox}>
              <Text style={styles.textStyle}>שם התורם: {donor.First_name + " " + route.params.route.Donor.Last_name}</Text>
              <Text style={styles.textStyle}>ת.ז: {route.params.route.Donor.Personal_id}</Text>
              <Text style={styles.textStyle}>תאריך לידה:  {fDate}</Text>
              <Text style={styles.textStyle}>מין: {route.params.route.Donor.Gender}</Text>
              <Text style={styles.textStyle}>ארץ לידה: {route.params.route.Donor.Birth_land}</Text>
              <Text style={styles.textStyle}>סוג דם: {route.params.route.Donor.Blood_type}</Text>
              <Text style={styles.textStyle}>ארץ לידת אב: {route.params.route.Donor.Father_birth_land}</Text>
              <Text style={styles.textStyle}>ארץ לידת אם: {route.params.route.Donor.Mother_birth_land}</Text>
              <Text style={styles.textStyle}>עיר: {route.params.route.Donor.Address}</Text>
              <Text style={styles.textStyle}>שנת עליה: {route.params.route.Donor.Aliya_year}</Text>
              <Text style={styles.textStyle}>מס' טלפון: {route.params.route.Donor.Phone}</Text>
              <Text style={styles.textStyle}>שם פרטי קודם: {route.params.route.Donor.Prev_first_name}</Text>
              <Text style={styles.textStyle}>שם משפחה קודם: {route.params.route.Donor.Prev_last_name}</Text>
            </View>
            <View style={styles.notes_container}>
              <TouchableOpacity onPress={() => setShowText(true)}>
                <View style={styles.button_normal}>
                  <Ionicons name="add-circle-outline" size={26} color="white" />
                  <Text style={styles.button_text} >הוסף הערות</Text>
                </View>
              </TouchableOpacity>
            </View>
            {showText &&
              <View style={styles.notes_container}>
                <TextInput
                  style={styles.input}
                  onChangeText={() => onChangeTextInput}
                  value={textInput}
                  placeholder="פרט/י"
                />
                <TouchableOpacity onPress={() => saveNotes()}>
                  <View style={styles.button_save_note}>
                    <AntDesign name="addfile" size={26} color="white" />
                    <Text style={styles.button_text} >שמור הערות</Text>
                  </View>
                </TouchableOpacity>
              </View>}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  inner: {
    justifyContent: "center",
  },
  infoBox: {
    height: 270,
    padding: 15,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'right',
  },
  button_normal: {
    alignItems: 'center',
    width: 120,
    height: 60,
    margin: 15,
    marginTop: 100,
    marginLeft: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  button_save_note: {
    alignItems: 'center',
    width: 120,
    height: 60,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  input: {
    width: 300,
    height: 40,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  notes_container: {
    alignItems: 'center',
  }
})