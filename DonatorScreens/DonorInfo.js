import React, { useState, useEffect } from 'react';
import { View, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import { url } from '../Utils'

export default function DonorInfo({ navigation, route }) {
  const [donator, setDonator] = useState(route.params.Donator)
  const [donor, setDonor] = useState(route.params.Donor);
  const [modalRefuse, setModalRefuseVis] = useState(false);
  const [appId, setAppintmentId] = useState()
  const [showText, setShowText] = useState(false);
  const [notesUnitOne, setNotesUnitOne] = useState(notesUnitOne === null ? 'אינו רשאי/ת לתרום' : 'רשאי/ת להמשיך לעמדה 2')


  const GetAppinmentInfo = async () => {
    try {
      let result = await fetch(url + "api/user/app", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: donor.Personal_id
        })
      });
      let appintment = await result.json()
      console.log("appintment", appintment);
      if (appintment !== "Appintment not found.") {
        setAppintmentId(appintment.App_id)
        console.log(appId);
      }
      else {
        Alert.alert("אין תור קיים בתאריך זה במערכת.")
        return
      }
    } catch (error) {
      console.log("אין תור פעיל בשרת");
    }
  }

  const SetDonatorDataInfoUnitOne = async () => {
    try {
      let result = await fetch(url + "api/data/unit/one", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          App_id: appId,
          Code_questioner: donator.Auto_worker_id,
          Questioner_name: donator.First_name + ' ' + donator.Last_name,
          Notes_unit_one: notesUnitOne
        })
      });
      let response = await result.json()
      console.log("SetDonorDataUnitOne", response);
      if (response === 'data unit one added successfully.') {
        Alert.alert("התורמ/ת רשאי/ת לעבור לעמדה מספר 2.")
        return
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SetConfirmOne = async () => {
    try {
      let result = await fetch(url + "api/confirm/unit/one", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: donor.Personal_id
        })
      });
      let response = await result.json()
      if (response === 'unit one confirm successfully.') {
        navigation.navigate('UnitOne', { route: donator })
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SaveNotesUnitOne = async () => {
    try {
      setShowText(false)
      Alert.alert("ההערות נשמרו בהצלחה")
    } catch (error) {
      console.log(error);
    }
  }

  const ApproveDonor = async () => {
    await GetAppinmentInfo();
    await SetDonatorDataInfoUnitOne();
    await SetConfirmOne();
  }

  const DeclaineDonor = async () => {
    await GetAppinmentInfo();
    await SetDonatorDataInfoUnitOne();
  }


  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.containr_btn}>
              <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo', { route: donor })}>
                <View style={styles.button_normal}>
                  <Feather name="info" size={24} color="white" />
                  <Text style={styles.button_text} >פרטים אישים</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('MedicalInfo', { route: donor })}>
                <View style={styles.button_normal}>
                  <FontAwesome5 name="notes-medical" size={24} color="white" />
                  <Text style={styles.button_text} >פרטים רפואים</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.notes_container}>
                <TouchableOpacity onPress={() => setShowText(true)}>
                  <View style={styles.button_normal}>
                    <FontAwesome5 name="notes-medical" size={26} color="white" />
                    <Text style={styles.button_text} >הוספת הערות</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {showText &&
                <View style={styles.notes_container}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setNotesUnitOne(text)}
                    value={notesUnitOne}
                    placeholder="פרט/י"
                  />
                  <TouchableOpacity onPress={() => SaveNotesUnitOne()}>
                    <View style={styles.button_save_note}>
                      <AntDesign name="addfile" size={24} color="white" />
                      <Text style={styles.button_text} >שמור הערות</Text>
                    </View>
                  </TouchableOpacity>
                </View>}
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  containr_btn: {
    alignSelf: 'center',
    marginTop: 25,
    flexDirection: 'column',
  },
  inner: {
    justifyContent: "center",
  },
  button_normal: {
    alignItems: 'center',
    width: 280,
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
    width: 280,
    height: 70,
    margin: 15,
    marginTop: 180,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#66ff66",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_refuse: {
    alignItems: 'center',
    width: 280,
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
    fontWeight: 'bold',
  },
  notes_container: {
    alignItems: 'center',
  },
  button_save_note: {
    alignItems: 'center',
    width: 135,
    height: 50,
    margin: 15,
    borderRadius: 8,
    padding: 5,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
    flexDirection: 'row'
  },
  input: {
    width: 300,
    height: 50,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
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