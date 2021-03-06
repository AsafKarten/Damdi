import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, Text, TouchableOpacity, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';
import BG from '../assets/LOGO_ONLY_PNG.png'


export default function Welcome({ navigation, route }) {
  console.log(route);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(route.params.route)
  const [firstName, setFirstName] = useState(user.First_name)


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (Platform.OS !== 'web') {
        setLoading(false)
        return
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);


  const clearAsyncStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      console.log("clear async storage")
    } catch (error) {
      console.log(error, "error with clean async storage")
    }
    console.log('Done.')
  }

  const logoutUser = async () => {
    setLoading(true)
    await clearAsyncStorage("loggedUser")
    setLoading(false)
    navigation.navigate("Login");
  }

  return (
    <View>
      <TouchableOpacity onPress={() => logoutUser()}>
        <View style={styles.button_logout}>
          <Text style={styles.button_text} >התנתק</Text>
        </View>
      </TouchableOpacity>

      <Image source={BG} style={{ width: 360, height: 150, alignSelf: 'center', resizeMode: 'stretch' }}></Image>

      <Text style={styles.welcome_text}> ברוך הבא {firstName === null ? '' : firstName} </Text>

      <TouchableOpacity onPress={() => {
        setLoading(false)
        navigation.navigate('Home', { route: user })
      }}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >המשך</Text>
        </View>
      </TouchableOpacity>
      {loading && <Spiner loading={loading} />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_logout: {
    alignItems: 'center',
    width: 90,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,

  },
  button_normal: {
    alignItems: 'center',
    width: 100,
    marginTop: 20,
    margin: 140,
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
  welcome_text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  }
});