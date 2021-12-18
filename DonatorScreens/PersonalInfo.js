import React, { useState, useEffect } from 'react';
import { View, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function PersonalInfo({ navigation, route }) {
  console.log(route);
  const [donor, setDonor] = useState(route.params.route);


  let birthDate = new Date(donor.Birthdate);
  var fDate = birthDate.getDate() + '/' + (birthDate.getMonth() + 1) + '/' + birthDate.getFullYear()

  return (
    <SafeAreaView>
      <View style={styles.infoBox}>
        <Text style={styles.textStyle}>שם התורם: {donor.First_name + " " + donor.Last_name}</Text>
        <Text style={styles.textStyle}>ת.ז: {donor.Personal_id}</Text>
        <Text style={styles.textStyle}>תאריך לידה:  {fDate}</Text>
        <Text style={styles.textStyle}>מין: {donor.Gender}</Text>
        <Text style={styles.textStyle}>ארץ לידה: {donor.Birth_land}</Text>
        <Text style={styles.textStyle}>סוג דם: {donor.Blood_type}</Text>
        <Text style={styles.textStyle}>ארץ לידת אב: {donor.Father_birth_land}</Text>
        <Text style={styles.textStyle}>ארץ לידת אם: {donor.Mother_birth_land}</Text>
        <Text style={styles.textStyle}>עיר: {donor.Address}</Text>
        <Text style={styles.textStyle}>שנת עליה: {donor.Aliya_year}</Text>
        <Text style={styles.textStyle}>מס' טלפון: {donor.Phone}</Text>
        <Text style={styles.textStyle}>שם פרטי קודם: {donor.Prev_first_name}</Text>
        <Text style={styles.textStyle}>שם משפחה קודם: {donor.Prev_last_name}</Text>
      </View>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  infoBox: {
    height: 270,
    padding: 15,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'right',
  }
})