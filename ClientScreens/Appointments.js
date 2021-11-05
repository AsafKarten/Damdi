import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

const url = "http://proj13.ruppin-tech.co.il/"

export default function Appointments({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.ButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >נווט אל התחנה</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >הוסף תזכורת</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >ביטול תור</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >עדכון תור</Text>
          </View>
        </TouchableOpacity>

      </View>


      <View style={styles.line}>
        <TouchableOpacity onPress={() => navigation.navigate('AppointmentsHistory', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text}>היסטורית התורים שלך</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flexDirection: 'row',
    borderBottomWidth: 1,
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
  ButtonContainer: {
    flexDirection: 'row'
  },
});
