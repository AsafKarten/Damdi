import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import BG from '../assets/LOGO_ONLY_PNG.png'
import ProgressBar from '../Componentes/ProgressBar.js'

export default function Home({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)

  useEffect(() => {
    navigation.addListener('focus', async () => {
    })
  }, [navigation])


  return (
    <SafeAreaView style={styles.container}>
      <Image source={BG} style={styles.header_img} />

      <ProgressBar />

      <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
        <View style={styles.button_normal}>
          <FontAwesome name="user" size={28} color="white" />
          <Text style={styles.button_text} >הפרופיל שלי</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.ButtonContainer}>


        <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: User })}>
          <View style={styles.button_normal}>
            <Entypo name="text-document" size={28} color="white" />
            <Text style={styles.button_text} >התורים שלי</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Stations', { route: User })}>
          <View style={styles.button_normal}>
            <FontAwesome5 name="map-marked-alt" size={28} color="white" />
            <Text style={styles.button_text} >חיפוש תחנה</Text>
          </View>
        </TouchableOpacity>

      </View>

    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row'
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
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header_img: {
    marginBottom: 40,
    width: 270,
    height: 90,
    alignSelf: 'center',
    resizeMode: 'stretch'
  }
});
