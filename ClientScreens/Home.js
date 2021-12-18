import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { url } from '../Utils';
import ProgressBar from 'react-native-progress/Bar'
import { FontAwesome,Entypo,FontAwesome5 } from '@expo/vector-icons';
import BG from '../assets/LOGO_ONLY_PNG.png'

export default function Home({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)
  const [numberDon, setNumberDonation] = useState()

  useEffect(() => {
    navigation.addListener('focus', async () => {
      await getNumberOfDonationsPerYear();
    })
  }, [navigation])

  //TODO: fix this return number of donations
  const getNumberOfDonationsPerYear = async () => {
    try {
      let result = await fetch(url + "api/number/donation", {
        method: 'GET'
      });
      let data = await result.json();
      setNumberDonation(data.Blood_donation_id)
    } catch (error) {
      console.error('error with retrun full user');
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Image source={BG} style={styles.header_img} />

      <View style={styles.container_progress_bar} >
        <ProgressBar color='red' progress={0.3} width={250} height={25} borderColor="navy" borderWidth={1.5} />
        <Text style={styles.textProgress}>{numberDon}/10000</Text>
        <Text style={styles.textProgress}>מנות דם שנתרמו השנה</Text>
      </View>

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
  },
  container_progress_bar: {
    alignItems: 'center',
  },
  textProgress: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'navy'
  }
});
