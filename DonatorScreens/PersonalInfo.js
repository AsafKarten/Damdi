import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';


export default function PersonalInfo({ navigation, route }) {

  const [Donator, setDonator] = useState(route.params.route.Donator);
  const [donor, setDonor] = useState(route.params.route.Donor);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>{donor.First_name + " " + donor.Last_name}</Text>
        <Text>{donor.Birthdate}</Text>
        <Text>{donor.Personal_id}</Text>
        <Text>{donor.Gender}</Text>
        <Text>{donor.Birth_land}</Text>
        <Text>{donor.Father_birth_landGender}</Text>
        <Text>{donor.Mother_birth_land}</Text>

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
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
})