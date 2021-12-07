import React, { useState, useEffect } from 'react';
import { View, Modal,Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function UnitTwoMain({ navigation, route }) {
  console.log(route.params.route);
  const [Donator, setDonator] = useState(route.params.route.Donator)
  const [donor, setDonor] = useState(route.params.route.Donor);
  const [Route, setRoute] = useState({ Donator: Donator, Donor: donor })
  const [modalRefuse, setModalRefuseVis] = useState(false);

  //inputs consts
  const[blood_pressure, onChangeBP] = useState("")
  const[puls, onChangePuls] = useState("")
  const[irregular_puls, onChangeIP] = useState("")
  const[hemoglobine, onChangeHemo] = useState("")

  const ApproveDonor = async()=>{
    //here we need to save the info about blood preseur and hemoglobin also the checker info so the donor can continue to part 3
    navigation.navigate('UnitTwo', { route: Donator })
  }
  const DeclaineDonor = async()=>{
    //here we need to delete the diclained user appointment if someting is wrong
    navigation.navigate('UnitTwo', { route: Donator })
  }




  return (
    <SafeAreaView>
                 <TextInput
                  style={styles.input}
                  onChangeText={onChangeBP}
                  value={blood_pressure}
                  placeholder="לחץ דם"
                />
                 <TextInput
                  style={styles.input}
                  onChangeText={onChangePuls}
                  value={puls}
                  placeholder="דופק"
                />
                 <TextInput
                  style={styles.input}
                  onChangeText={onChangeIP}
                  value={irregular_puls}
                  placeholder="סדיר-לשנות לבול"
                />
                 <TextInput
                  style={styles.input}
                  onChangeText={onChangeHemo}
                  value={hemoglobine}
                  placeholder="המוגלובין"
                />

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
})