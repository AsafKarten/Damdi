import * as React from 'react';
//import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationApps, actions, googleMapsTravelModes } from 'react-native-navigation-apps';


export default function Maps({ navigation, route }) {
  console.log(route.params.route);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.textUnderCard}>בחר באפליקציה ונווט אל התחנה בקלות</Text>
      </View>
      <NavigationApps
        iconSize={50}
        row
        address={""} // address to navigate by for all apps 
        waze={{ address: route.params.route.F_address, lat: route.params.route.Lat, lon: route.params.route.Lng, action: actions.navigateByAddress }} // specific settings for waze
        googleMaps={{ lat: route.params.route.Lat, lon: route.params.route.Lng, action: actions.navigateByAddress, travelMode: "" }} // specific settings for google maps
        maps={{ lat: route.params.route.Lat, lon: route.params.route.Lng, action: actions.navigateByAddress, travelMode: "" }} // specific settings for maps
      />
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
    marginBottom:10,
  },
  textUnderCard: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
