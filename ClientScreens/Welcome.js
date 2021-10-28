import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';
import BG from '../assets/LOGO_ONLY_PNG.png'


export default function Welcome({ navigation, route }) {
  console.log("Welcome" ,route.params.route);

  const [loading, setLoading] = useState(false);
  const [User, setUser] = useState(route.params.route)
  const [shouldShow, setShouldShow] = useState(false);


  useEffect(() => {
    navigation.addListener('focus', async () => {
      setLoading(false);
    })
  }, [navigation])

  useEffect(() => {
    (async () => {
      setLoading(false);
      await clearAsyncStorage();
      await storeData(User);
    })
  }, [])

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Done clear storage');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <Image source={BG} style={{ width: 360, height: 150, alignSelf: 'center', resizeMode: 'stretch' }}></Image>

      <Text> ברוך הבא לדאמדי {User.First_name} </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Home', { route: User }, setShouldShow(true))}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >המשך</Text>
        </View>
      </TouchableOpacity>
      {shouldShow ? (
        <Spiner loading={loading} />
      ) : null}
    </View>
  )
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
    color: 'white'
  },
});