import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';


export default function DonorInfo({ navigation, route }) {
  console.log(route.params.route);
  const [Donator, setDonator] = useState(route.params.route.Donator)
  const [donor, setDonor] = useState(route.params.route.Donor);
  const [Route, setRoute] = useState({ Donator: Donator, Donor: donor })


  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo', { route: Route })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >פרטים אישים</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MedicalInfo', { route: Route })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >פרטים רפואים</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >אישור תורם</Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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