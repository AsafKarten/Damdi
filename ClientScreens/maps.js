import * as React from 'react';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Waze from '../assets/waze.png'
import GooglMaps from '../assets/google_maps.png'

export default function Maps({ route }) {
  const address = route.params.route.stationName

  return (
    <View style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.textUnderCard}>בחר באפליקציה ונווט אל התחנה בקלות</Text>
      </View>
      <View style={styles.icons_container}>
        <TouchableOpacity onPress={() => Linking.openURL(`https://waze.com/ul?q=${address}`)}>
          <View>
            <Text style={styles.textUnderCard}>Waze</Text>
            <Image style={styles.icon} source={Waze}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`)}>
          <View >
            <Text style={styles.textUnderCard}>Google Maps</Text>
            <Image style={styles.icon} source={GooglMaps}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  topContainer: {
    marginBottom: 10,
  },
  textUnderCard: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',

  },
  icons_container:{
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly'
  },
  icon: {
    alignSelf: 'center',
    width: 85,
    height: 85,
  }
});
