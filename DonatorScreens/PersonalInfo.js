import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Image, FlatList } from 'react-native';


export default function PersonalInfo({ navigation, route }) {
  const [Donator, setDonator] = useState(route.params.route.Donator);
  const [donor, setDonor] = useState(route.params.route.Donor);

  return (
    <SafeAreaView>
<View style={styles.infoBox}>
        <Text style={styles.textStyle}>שם התורם: {route.params.route.Donor.First_name + " " + route.params.route.Donor.Last_name}</Text>
        <Text style={styles.textStyle}>ת.ז: {route.params.route.Donor.Personal_id}</Text>
        <Text style={styles.textStyle}>תאריך לידה:  {route.params.route.Donor.Birthdate}</Text>
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
      <TouchableOpacity onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >אישור תורם</Text>
        </View>
      </TouchableOpacity>

   
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  infoBox:{
    height:300,
    padding:15,
 
    
  },
  textStyle:{
    fontSize:20,
    textAlign:'right',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button_normal: {
    alignItems: 'center',
    width: 90,
    height: 90,
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
})