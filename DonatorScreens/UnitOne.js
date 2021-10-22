import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';


const url = "http://proj13.ruppin-tech.co.il/"

export default function UnitOne({ navigation, route }) {
  const [Donator, setDonator] = useState(route.params.route)
  //const [donor, setDonor] = useState();
  const [shouldShow, setShouldShow] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [PersonalId, onChangeId] = useState();
  //const [Route, setRoute] = useState({ Donator: Donator, Donor: donor });

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

  return (
    <SafeAreaView style={styles.container}>
      <Image source={BG} style={styles.header_img} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={PersonalId}
        placeholder="תעודת זהות"
      />

      <TouchableOpacity onPress={() => getDonorInfo()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >התחל</Text>
        </View>
      </TouchableOpacity>

      {shouldShow ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View >
            <View >


              <View style={styles.list}>
                <View >
                  <Text >{Donator.First_name + " " + Donator.Last_name}</Text>
                  <Text>בחר עמדה</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >עמדה 1</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >עמדה 2</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >עמדה 3</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableHighlight
                style={{ backgroundColor: '#4d5b70' }}
                onPress={() => {
                  setConfirmModal(!confirmModal);
                }}>
                <Text>סגור</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      ) : null}


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
  },
  button_text: {
    color: 'white'
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