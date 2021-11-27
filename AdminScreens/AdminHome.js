import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import BG from '../assets/LOGO_ONLY_PNG.png'
import Spiner from '../Componentes/Spiner.js'

export default function Home({ navigation, route }) {
  const [Admin, onChangeId] = useState(route.params.route)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      setLoading(false);
    })
  }, [navigation])

  const logoutUser = async () => {
    setLoading(true)
    navigation.navigate("MainScreen");
  }

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.logout_container}>
        <TouchableOpacity onPress={() => logoutUser()}>
          <View style={styles.button_logout}>
            <Text style={styles.button_text} >התנתק</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Image source={BG} style={styles.header_img}></Image>

      <TouchableOpacity onPress={() => navigation.navigate('AddUser', { route: Admin })}>
        <View style={styles.button_normal}>

          <Text style={styles.button_text} >הוספת משתמשים חדש</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.ButtonContainer}>


        <TouchableOpacity onPress={() => navigation.navigate('UpdateUser', { route: Admin })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >עדכון פרטי משתמשים</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RemoveUser')}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >מחיקת משתמשים קיימים</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.ButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('SearchUser')}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >חיפוש משתמש קיים</Text>
          </View>
        </TouchableOpacity>

        {loading && <Spiner loading={loading} />}

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
    width: 100,
    height: 85,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  logout_container: {
    marginRight: 200,
    marginTop: -20
  },
  button_logout: {
    alignItems: 'center',
    width: 100,
    borderRadius: 8,
    padding: 10,
    marginBottom:80,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
  }
});
