import React, { useState, useEffect } from 'react';
import { View, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import { url } from '../Utils'
import { Dropdown } from 'react-native-element-dropdown';
import * as SMS from 'expo-sms';


export default function UnitThreeMain({ navigation, route }) {
  const [Donator, setDonator] = useState(route.params.route.Donator)
  const [donor, setDonor] = useState(route.params.route.Donor);
  const [stationName, setStationName] = useState(route.params.route.siteName)
  const [modalRefuse, setModalRefuseVis] = useState(false);
  const [showText, setShowText] = useState(false);
  const [appId, setAppintmentId] = useState()
  const [staionCode, setStationCode] = useState()
  const [dateDonation, setDateDonation] = useState(new Date())
  const [ageApp, setAgeApp] = useState(false);
  const toggleAgeApp = () => onChangeAge(previousState => !previousState)
  const [notesUnitThree, setNotesUnitThree] = useState(notesUnitThree === null ? 'אינו רשאי/ת לתרום' : '.תרומה בוצעה')

  //Toggle Switch consts
  const [notForUse1, onChangeNFU1] = useState(false);
  const toggle1 = () => onChangeNFU1(previousState => !previousState);

  //Dropdown properties
  const [donationType, setDonationType] = useState()
  const [isFocusType, setIsFocusType] = useState(false);

  const [durationDonation, setDurationDonation] = useState()
  const [isFocusDuration, setIsFocusDuration] = useState(false);

  const typesDonations = [
    { label: 'דם מלא', value: '1' },
    { label: 'פרזיס', value: '2' },
    { label: 'עצמית', value: '3' },
  ];

  const typesDonators = [
    { label: 'מתרים', value: '1' },
    { label: 'אחות', value: '2' },
    { label: 'חובש', value: '3' },
    { label: 'מתנדב', value: '4' },
    { label: 'ש"ל', value: '5' },
    { label: 'פרמדיק', value: '6' },
    { label: 'רופא', value: '7' }
  ];

  const durationDonations = [
    { label: 'עד 12 דקות', value: '1' },
    { label: 'מעל 12 דקות', value: '2' },
    { label: 'מעל 15 דקות', value: '3' }
  ];


  const DropdownDonationType = () => {
    const renderLabel = () => {
      if (donationType || isFocusType) {
        return (
          <Text style={[styles.label, isFocusType && { color: 'blue' }]}>
            סוג התרומה
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={{
        fontWeight: 'bold',
        padding: 16,
        borderRadius: 10,
        width: 200,
      }} >
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocusType && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={typesDonations}
          maxHeight={100}
          labelField="label"
          valueField="value"
          placeholder={!isFocusType ? 'בחר סוג' : '...'}
          value={donationType}
          onFocus={() => setIsFocusType(true)}
          onBlur={() => setIsFocusType(false)}
          onChange={item => {
            setDonationType(item.value);
            setIsFocusType(false);
          }}
        />
      </View>
    );
  };

  const DropdownDurationDonation = () => {
    const renderLabel = () => {
      if (durationDonation || isFocusDuration) {
        return (
          <Text style={[styles.label, isFocusDuration && { color: 'blue' }]}>
            משך זמן התרמה
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={{
        padding: 10,
        borderRadius: 10,
        width: 200,
      }} >
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocusDuration && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={durationDonations}
          maxHeight={100}
          labelField="label"
          valueField="value"
          placeholder={!isFocusDuration ? 'בחר' : '...'}
          value={durationDonation}
          onFocus={() => setIsFocusDuration(true)}
          onBlur={() => setIsFocusDuration(false)}
          onChange={item => {
            setDurationDonation(item.value);
            setIsFocusDuration(false);
          }}
        />
      </View>
    );
  };

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
        setStationCode(appintment.Station_code)
      }
      else {
        Alert.alert("אין תור קיים בתאריך זה במערכת.")
        return
      }
    } catch (error) {
      console.log("אין תור פעיל בשרת");
    }
  }

  const SetConfirmThree = async () => {
    try {
      let result = await fetch(url + "api/confirm/unit/three", {
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
        await SetSummeryDonation();
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SetDonatorDataInfoUnitThree = async () => {
    try {
      let result = await fetch(url + "api/data/unit/three", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          App_id: Donator.Auto_worker_id,
          TypeEmployee: Dontaor.TypeEmployee,
          Bp_checker: Donator.First_name + ' ' + Donator.Last_name,
          Checker_name: Donator.First_name + ' ' + Donator.Last_name,
          Approver: Donator.First_name + ' ' + Donator.Last_name,
          Abnormal_response: notForUse1,
          Which_response: "typeResponse",//TODO: dropdown typeResponse
          Went_to_hospital: notForUse1,
          By_mada: notForUse1,
          Refused_evacuate: notForUse1,
          No_for_platelets: notForUse1,
          Blood_for_freeze: notForUse1,
          Empty_bag: notForUse1,
          No_sterile_dose: notForUse1,
          Epmty_tubes: notForUse1,
          Tube_for_count: notForUse1,
          Rich_in_antibodies: notForUse1,
          Type_antibody: typeAntibody,
          Less_iga: notForUse1,
          Reported_part_b: notForUse1,
          Reported_part_c: notForUse1,
          Section_part_c: "moreDataText",//TODO: cretae text input moreDataText
          Sort: isSort,
          Detail_Iga: "detailIgaText", //TODO: cretae text input detailIgaText
          Type_bag: "typeBag",  //TODO: dropdown typeBag
          Dose_weight: 10, //TODO: cretae text input weight
          Qualificat_name: Donator.First_name + ' ' + Donator.Last_name,
          Code_qualificat: Donator.Auto_worker_id,
          Duration: "duration", //TODO: dropdown duration until 12 min over 12 min and over 15 min
          Notes_unit_three: notesUnitThree
        })
      });
      let response = await result.json()
      if (response === 'data added successfully.') {
        Alert.alert('פרטי התרומה נשמרו בהצלחה במערכת.')
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
      }
    } catch (error) {
      console.log("Error with send data to server, check connection to server.");
    }
  }

  const SetSummeryDonation = async () => {
    try {
      let result = await fetch(url + "api/summery/donation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: donor.Personal_id,
          Station_code: staionCode,
          Station_name: stationName,
          Donation_type: donationType,
          Age_approve: ageApp,
          Auto_worker_id: Donator.Auto_worker_id,
          Donation_date: dateDonation
        })
      });
      let response = await result.json()
      if (response === 'data added successfully.') {
        Alert.alert('פרטי התרומה נשמרו בהצלחה במערכת.')
        navigation.navigate('UnitThree', { route: Donator })
      }
      else {
        Alert.alert("שגיאה", "תקלה זמנית בהטמעת הפרטים במערכת, נסה שוב בבקשה..")
        return;
      }
    } catch (error) {
      console.log("Error with send data to server, check connection to server.");
    }
  }


  //here we need to save the Donation info also the donator info and delete the appointment
  const ApproveDonor = async () => {
    await GetAppinmentInfo();
    await SetDonatorDataInfoUnitThree();
    //if the donator do mistake or decide to pass current donor, the system will check it anyway
    if (!notForUse1) {
      await SetConfirmThree();
      await sentSMS();
      await DeleteAppointmentUnitThree();
    }
    else {
      await DeleteAppointmentUnitThree();
      Alert.alert("המשתמש אינו רשאי לתרום מכיוון שמצבו הבריאותי לא מאפשר זאת.")
      return;
    }
  }

  //here we need to delete the diclained user appointment if someting is wrong
  const DeclaineDonor = async () => {
    await GetAppinmentInfo();
    await SetDonatorDataInfoUnitThree();
    await DeleteAppointmentUnitThree();
  }

  const DeleteAppointmentUnitThree = async () => {
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
        navigation.navigate('UnitThree', { route: Donator })
        return
      }
    } catch (error) {
      console.log("Failed to delete Appointment from the server try later again.");
    }
  }


  const SaveNotesUnitThree = async () => {
    try {
      setShowText(false)
      Alert.alert("ההערות נשמרו בהצלחה.")
    } catch (error) {
      console.log(error);
    }
  }

  const sentSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        donor.Phone,
        'תודה שתרמת, אל תשכח/י לבוא שוב בעוד שלושה חודשים.'
      );
      if (result === 'sent') {
        Alert.alert("ההודעה נשלחה ללקוח בהצלחה.")
        return
      }
    } else {
      Alert.alert("SMS function not available")
    }
  }




  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>אישור בכתב בשל גיל:</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={toggleAgeApp}
            value={ageApp}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>תגובה חריגה?</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={toggle1}
            value={notForUse1}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>פונה לבית חולים?</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={toggle1}
            value={notForUse1}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>על ידי מד"א?</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={toggle1}
            value={notForUse1}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>סירב פינוי</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={toggle1}
            value={notForUse1}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>סוג התרמה:</Text>
        </View>
        {DropdownDonationType()}
      </View>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.text}>משך זמן התרמה:</Text>
        </View>
        {DropdownDurationDonation()}
      </View>
      <View style={styles.notes_container}>
        <TouchableOpacity onPress={() => setShowText(true)}>
          <View style={styles.button_normal}>
            <FontAwesome5 name="notes-medical" size={26} color="white" />
            <Text style={styles.button_text} >הוספת הערות</Text>
          </View>
        </TouchableOpacity>
        {showText &&
          <View style={styles.notes_container}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNotesUnitThree(text)}
              value={notesUnitThree}
              placeholder="פרט/י"
            />
            <TouchableOpacity onPress={() => SaveNotesUnitThree()}>
              <View style={styles.button_save_note}>
                <AntDesign name="addfile" size={18} color="white" />
                <Text style={styles.button_text} >שמור הערות</Text>
              </View>
            </TouchableOpacity>
          </View>}
      </View>
      <View style={styles.buttons_container}>
        <TouchableOpacity onPress={() => DeclaineDonor()}>
          <View style={styles.button_refuse}>
            <MaterialIcons name="block" size={24} color="white" />
            <Text style={styles.button_text} >ביטול תרומה</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ApproveDonor()}>
          <View style={styles.button_confirm}>
            <FontAwesome5 name="stamp" size={24} color="white" />
            <Text style={styles.button_text} >סיום תרומה</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  containr_btn: {
    alignItems: 'center',
    marginRight: 20,
    flexDirection: 'column',
  },
  button_normal: {
    alignItems: 'center',
    width: 120,
    height: 55,
    margin: 5,
    borderRadius: 8,
    padding: 3,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  buttons_container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 50
  },
  button_confirm: {
    alignItems: 'center',
    width: 115,
    height: 52,
    marginLeft: 20,
    borderRadius: 8,
    padding: 4,
    backgroundColor: "#66ff66",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_refuse: {
    alignItems: 'center',
    width: 120,
    height: 52,
    margin: 5,
    borderRadius: 8,
    padding: 5,
    backgroundColor: "#ff6766",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  notes_container: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  button_save_note: {
    alignItems: 'center',
    width: 140,
    height: 40,
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
    height: 35,
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
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    width: 380,
    height:60,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  switchContainer: {
    flexDirection: 'row',
  },
  //dropdown
  dropdown: {
    height: 35,
    width: 150,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 15
  },
  placeholderStyle: {
    fontSize: 15,
    fontColor: "black",
  },
  selectedTextStyle: {
    fontColor: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
})