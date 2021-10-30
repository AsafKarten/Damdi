import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import BG from '../assets/LOGO_ONLY_PNG.png'
import ProgressBar from '../Componentes/ProgressBar.js'

export default function Home({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)

  useEffect(() => {
    navigation.addListener('focus', async () => {
      setLoading(false);
    })
  }, [navigation])


  return (
    <SafeAreaView style={styles.container}>
      <Image source={BG} style={styles.header_img}></Image>

      <ProgressBar />

      <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
        <View style={styles.button_normal}>

          <Text style={styles.button_text} >הפרופיל שלי</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.ButtonContainer}>


        <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >התורים שלי</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Stations', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >חיפוש תחנה קרובה</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.ButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('BloodInfo', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >מידע על תרומות הדם</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Friends', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >החברים שלי</Text>
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
    color: 'white'
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
  }
});
