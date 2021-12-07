import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { url } from '../Utils'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function UnitOne({ navigation, route }) {
  const [Donator, setDonator] = useState(route.params.route)
  const [shouldShow, setShouldShow] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [PersonalId, onChangeId] = useState();



  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        setShouldShow(true)
      }
    })()
  }, [])

  const getDonorInfo = async () => {
    try {
      if (PersonalId === undefined || PersonalId === null || PersonalId === '') {
        Alert.alert("שגיאת התחברות", "אנא מלא/י תעודת זהות תורם !")
        console.log('====================================');
        console.log("Error, Empty field");
        console.log('====================================');
        return
      }
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
        })
      });
      let donor = await result.json();
      if (donor !== undefined || donor !== null) {
        const Route = { Donator: Donator, Donor: donor }
        navigation.navigate('DonorInfo', { route: Route })
      }
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const AppointmentsList = () => {
    var route = {Donator:Donator}
    navigation.navigate('AppListOne', {route:route})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containr_btn}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeId}
          value={PersonalId}
          placeholder="תעודת זהות"
        />
        <TouchableOpacity onPress={() => getDonorInfo()}>
          <View style={styles.button_start}>
            <AntDesign name="logout" size={24} color="white" />
            <Text style={styles.button_text} >התחל</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => AppointmentsList()}>
        <View style={styles.button_list_app}>
          <Feather name="list" size={24} color="white" />
          <Text style={styles.button_text} >רשימת תורים</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containr_btn: {
    alignSelf: 'center',
    marginTop: 35,
    flexDirection: 'row-reverse',
    marginTop: 35,
  },
  ButtonContainer: {
    flexDirection: 'row'
  },
  input: {
    height: 40,
    width: 220,
    margin: 14,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_start: {
    alignItems: 'center',
    width: 90,
    height: 65,
    margin: 14,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,

  },
  button_list_app: {
    alignItems: 'center',
    width: 90,
    height: 90,
    margin: 15,
    marginRight: 265,
    marginTop: 40,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  list: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: 28,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black",
  },
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 12,
  },
});