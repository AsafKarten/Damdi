import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

export default function BloodInfo({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)


  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >הפרופיל שלי</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Stations', { route: User })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >חיפוש תחנה קרובה</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: User })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >התורים שלי</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Friends', { route: User })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >החברים שלי</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('BloodInfo', { route: User })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >מידע על תרומות הדם</Text>
        </View>
      </TouchableOpacity>

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
    shadowRadius: 5
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
});
