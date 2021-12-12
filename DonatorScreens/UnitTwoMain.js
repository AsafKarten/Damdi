import React, { useState } from 'react';
import { View, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';


export default function UnitTwoMain({ navigation, route }) {
  console.log(route.params.route);
  const [Donator, setDonator] = useState(route.params.route.Donator)
  const [donor, setDonor] = useState(route.params.route.Donor);
  const [Route, setRoute] = useState({ Donator: Donator, Donor: donor })
  const [appId, setAppintmentId] = useState()
  const [showText, setShowText] = useState(false);
  const [modalRefuse, setModalRefuseVis] = useState(false);
  const [notesUnitTwo, setNotesUnitTwo] = useState(notesUnitTwo === null ? 'אינו רשאי/ת לתרום' : 'רשאי/ת להמשיך לעמדה 3')

  //inputs consts
  const [blood_pressure, onChangeBP] = useState("")
  const [pulse, onChangePulse] = useState("")
  const [hemoglobine, onChangeHemo] = useState("")
  const [irregular_pulse, onChangeIP] = useState(false);
  const irregular_pulse_toggle = () => onChangeIP(previousState => !previousState);

  const ValidationData = async () => {
    if (
      blood_pressure === null ||
      blood_pressure === "" ||
      pulse === null ||
      pulse === "" ||
      irregular_pulse === null ||
      irregular_pulse === "" ||
      hemoglobine === null ||
      hemoglobine === "") {
      Alert.alert("אנא מלא/י את כל השדות");
      return
    } else {
      await ApproveDonor();
    }
  }

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

  const SetDonatorDataInfoUnitTwo = async () => {
    try {
      let result = await fetch(url + "api/confirm/pos/two", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          App_id: Donator.Auto_worker_id,
          Checker_hemog: Donator.First_name + ' ' + Donator.Last_name,
          Code_hemog: hemoglobine,
          Blood_pressure: blood_pressure,
          Noraml_pulse: irregular_pulse,
          Pulse: pulse,
          Notes_unit_two: notesUnitTwo
        })
      });
      let response = await result.json()
      if (response === 'data added successfully.') {
        Alert.alert("התורמ/ת רשאי/ת לעבור לעמדה מספר 3.")
        navigation.navigate('UnitTwo', { route: Donator })
        onChangeBP("")
        onChangePulse("")
        onChangeIP(false)
        onChangeHemo("")
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
      }
    } catch (error) {
      console.log("Error with send data to server, check connection to server.");
    }
  }

  const SetConfirmTwo = async () => {
    try {
      let result = await fetch(url + "api/confirm/unit/two", {
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
      if (response === 'unit two confirm successfully.') {
        navigation.navigate('UnitTwo', { route: Donator })
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ApproveDonor = async () => {
    await GetAppinmentInfo();
    await SetDonatorDataInfoUnitTwo();
    await SetConfirmTwo();
  }


  const DeclaineDonor = async () => {
    await GetAppinmentInfo();
    await SetDonatorDataInfoUnitTwo();
    await DeleteAppointmentUnitTwo();
  }

  const DeleteAppointmentUnitTwo = async () => {
    try {
      let result = await fetch(url + "api/del/app", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          App_id: appId
        })
      });
      let response = await result.json()
      if (response === "Appointment deleted successfully") {
        navigation.navigate('UnitTwo', { route: Donator })
        return
      }
    } catch (error) {
      console.log("Failed to delete Appointment from the server try later again.");
    }
  }

  const SaveNotesUnitTwo = async () => {
    try {
      setShowText(false)
      Alert.alert("ההערות נשמרו בהצלחה.")
    } catch (error) {
      console.log(error);
    }
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
        onChangeText={onChangePulse}
        value={pulse}
        placeholder="דופק"
      />
      <View style={styles.checkboxContainer}>
        <Text>דופק סדיר: </Text>
        <Switch
          onValueChange={irregular_pulse_toggle}
          value={irregular_pulse}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeHemo}
        value={hemoglobine}
        placeholder="המוגלובין"
      />

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
              onChangeText={(text) => setNotesUnitTwo(text)}
              value={notesUnitTwo}
              placeholder="פרט/י"
            />
            <TouchableOpacity onPress={() => SaveNotesUnitTwo()}>
              <View style={styles.button_save_note}>
                <AntDesign name="addfile" size={26} color="white" />
                <Text style={styles.button_text} >שמור הערות</Text>
              </View>
            </TouchableOpacity>
          </View>}
        <TouchableOpacity onPress={() => ValidationData()}>
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
    marginTop: 15,
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
  notes_container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  button_save_note: {
    alignItems: 'center',
    width: 100,
    height: 70,
    margin: 10,
    borderRadius: 8,
    padding: 10,
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
  checkboxContainer: {
    alignSelf: 'center',
    flexDirection: 'row'
  },
})