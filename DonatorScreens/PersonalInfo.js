import React, { useState, useEffect } from 'react';
import { View, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function PersonalInfo({ navigation, route }) {
  const [Donator, setDonator] = useState(route.params.route.Donator);
  const [donor, setDonor] = useState(route.params.route.Donor);


  let birthDate = new Date(donor.Birthdate);
  var fDate = birthDate.getDate() + '/' + (birthDate.getMonth() + 1) + '/' + birthDate.getFullYear()

  return (
    <SafeAreaView>
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