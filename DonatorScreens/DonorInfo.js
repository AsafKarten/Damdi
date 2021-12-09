import React, { useState, useEffect } from 'react';
import { View, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import {url} from '../Utils'

export default function DonorInfo({ navigation, route }) {
  console.log(route.params.route);
  const [Donator, setDonator] = useState(route.params.route.Donator)
  const [donor, setDonor] = useState(route.params.route.Donor);
  const [Route, setRoute] = useState({ Donator: Donator, Donor: donor })
  const [modalRefuse, setModalRefuseVis] = useState(false);

  const ApproveDonor = async () => {
    //here we need to save the approve and the approver so the donor can continue to part 2
    //api/appointments/pos/one
    try {
      let result = await fetch(url + "api/confirm/pos/one", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Code_questioner: Donator.Auto_worker_id,
          Checker_hemog: Donator.First_name + ' ' + Donator.Last_name,
          // Code_hemog: hemoglobine,
          // Blood_pressure: blood_pressure,
          // Noraml_pulse: irregular_pulse,
          // Pulse: pulse
        })
      });
      let response = await result.json()
      if (response === 'data added successfully.') {
        navigation.navigate('UnitTwo', { route: Donator })
        onChangeBP("")
        onChangePuls("")
        onChangeIP("")
        onChangeHemo("")
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
      }
    } catch (error) {
      console.log(error);
    }
 

    navigation.navigate('UnitOne', { route: Donator })
  }
  const DeclaineDonor = async () => {
    //here we need to delete the diclained user appointment and probable write it some where
    navigation.navigate('UnitOne', { route: Donator })
  }


  return (
    <SafeAreaView>
      <View style={styles.containr_btn}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo', { route: route.params.route })}>
          <View style={styles.button_normal}>
            <Feather name="info" size={24} color="white" />
            <Text style={styles.button_text} >פרטים אישים</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MedicalInfo', { route: route.params.route })}>
          <View style={styles.button_normal}>
            <FontAwesome5 name="notes-medical" size={24} color="white" />
            <Text style={styles.button_text} >פרטים רפואים</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ApproveDonor()}>
          <View style={styles.button_confirm}>
            <FontAwesome5 name="stamp" size={24} color="white" />
            <Text style={styles.button_text} >אישור אימות פרטים</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DeclaineDonor()}>
          <View style={styles.button_refuse}>
            <MaterialIcons name="block" size={24} color="white" />
            <Text style={styles.button_text} >לא רשאי\ת לתרום</Text>
          </View>
        </TouchableOpacity>
        {modalRefuse && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalRefuse}
              onRequestClose={() => { console.log('Modal has been closed.'); }}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>לצערנו אינך יכול\ה לתרום דם, אנא פנה לרופא משפחה כדי לבצע בדיקות תקינות גופנית</Text>
                <View style={styles.modal_buttons}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalRefuseVis(!modalRefuse)}>
                    <Text style={styles.textStyle}>סגור</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containr_btn: {
    alignSelf: 'center',
    marginTop: 35,
    flexDirection: 'column',
  },
  button_normal: {
    alignItems: 'center',
    width: 250,
    height: 70,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_confirm: {
    alignItems: 'center',
    width: 250,
    height: 70,
    margin: 15,
    marginTop: 250,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#66ff66",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_refuse: {
    alignItems: 'center',
    width: 250,
    height: 70,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ff6766",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },

  //Modal buttons 
  modalView: {
    margin: 20,
    backgroundColor: '#757c94',
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  buttonClose: {
    width: 120,
    backgroundColor: "white",
    opacity: 0.8,
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
})