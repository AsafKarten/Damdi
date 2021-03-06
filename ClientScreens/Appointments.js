import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Modal, Pressable, Share } from 'react-native'
import { Card } from 'react-native-elements';
import { url } from '../Utils';
import { Ionicons, AntDesign, MaterialIcons, Foundation } from '@expo/vector-icons';

export default function Appointments({ navigation, route }) {
  const [hasApp, onChangeHasApp] = useState(false);
  const [modalDel, setModalDelete] = useState(false)
  const [modalPassApp, setModalPassApp] = useState(false);

  const [User, onChangeId] = useState(route.params.route)
  const [app_id, setAppintmentId] = useState();
  const [locationApp, setLocation] = useState()
  const [fullDate, setFullDate] = useState();

  var dateTime = new Date()
  var today = dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear() + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes();

  var customDate = new Date(fullDate)
  var fDate = customDate.getDate() + '/' + (customDate.getMonth() + 1) + '/' + customDate.getFullYear()

  var customTime = new Date(fullDate)
  var fTime = customTime.getUTCHours() + ":" + customTime.getUTCMinutes()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await checkActiveAppinment()
      setModalDelete(false)
    });
    return unsubscribe;
  }, [navigation]);

  const getStationName = async (stationCode) => {
    try {
      let result = await fetch(url + "api/search/stations/code", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Station_code: stationCode
        })
      });
      let stationData = await result.json()
      if (stationData !== null) {
        setLocation(stationData.Station_name)
      }
    } catch (error) {
      console.log(error, "לא נמצאה תחנת תרמה עם קוד זה");
    }
  }


  const checkActiveAppinment = async () => {
    try {
      let result = await fetch(url + "api/user/app", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: route.params.route.Personal_id
        })
      });
      let appintment = await result.json()
      console.log(appintment);
      if (appintment === "Appintment not found.") {
        setModalPassApp(true)
        onChangeHasApp(false);
        return
      }
      else if (appintment.App_time < today) {
        onChangeHasApp(false)
        return
      }
      else {
        onChangeHasApp(true);
        setFullDate(appintment.App_time)
        setAppintmentId(appintment.App_id)
        await getStationName(appintment.Station_code)
      }
    }
    catch (error) {
      console.log("אין תור פעיל בשרת");
    }
  }

  const deleteExistAppointment = async () => {
    try {
      let result = await fetch(url + "api/del/app", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          App_id: app_id
        })
      });
      let response = await result.json()
      console.log(response);
      if (modalPassApp === true) {
        Alert.alert("פספסת את התור, הוא לא קיים במערכת, קבע/י תור חדש")
        return;
      }
      else {
        Alert.alert("הודעת מערכת", "תור הוסר בהצלחה,תזכרו תרומת דם מצילה חיים!")
        onChangeHasApp(false)
      }
    } catch (error) {
      console.log("Failed to delete Exist Appointment");
    }
  }

  const moveToReminder = () => {
    if (locationApp === undefined || fullDate === undefined) {
      Alert.alert("אין לך תור פעיל, לכן אין אפשרות להוסיף תזכורת ליומן")
      return
    }
    var data = { location: locationApp, date: fullDate }
    navigation.navigate('ReminderScreen', { route: data })
  }

  const onShare = async () => {
    try {
      if (locationApp === undefined || fullDate === undefined) {
        Alert.alert("אין לך תור פעיל, לכן אין אפשרות לשתף את תור")
        return
      }
      const result = await Share.share({
        message:
          `רציתי להזמין אותך לתרום דם יחד, תוריד את האפליקציה Damdi ואזמן תור בקלות ובמהירות, אזמן תור לתאריך ${fDate} בשעה ${fTime} ב${locationApp} `,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const checkAddress = () => {
    if (locationApp === undefined || locationApp === null) {
      setModalPassApp(true);
      return;
    } else {
      let location = { stationName: locationApp };
      navigation.navigate('Maps', { route: location })
    }
  }

  const updateExistApp = () => {
    if (locationApp === undefined || fullDate === undefined) {
      setModalPassApp(true)
      return
    }
    else {
      navigation.navigate('Stations', { route: User })
    }
  }


  return (
    <SafeAreaView style={styles.container}>

      {hasApp && (
        <View style={styles.topContainer}>
          <Card elevation={7}>
            <Text style={styles.title_active_app}>תור פעיל</Text>
            <Text style={styles.paragraph}>
              מיקום התחנה: {locationApp}{"\n"}
              בתאריך: {fDate}{"\n"}
              בשעה: {fTime}
            </Text>
          </Card>
          <Text style={styles.textUnderCard}>שים לב !</Text>
          <Text style={styles.textUnderCard}>לא לשכוח למלא את הטופס הרפואי בסמוך למועד התור</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MedicalForm', { route: User })}>
            <View style={styles.medical_button}>
              <Foundation name="clipboard-pencil" size={30} color="black" />
              <Text style={styles.button_text} >מילוי שאלון רפואי</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttomContainer}>
        <View style={styles.ButtonContainer}>

          <TouchableOpacity onPress={() => checkAddress()}>
            <View style={styles.button_normal}>
              <Ionicons name="navigate-circle-outline" size={30} color="white" />
              <Text style={styles.button_text} >נווט אל התחנה</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => moveToReminder()}>
            <View style={styles.button_normal}>
              <Ionicons name="alarm-outline" size={30} color="white" />
              <Text style={styles.button_text} >הוסף תזכורת</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={() => hasApp ? setModalDelete(true) : setModalPassApp(true)}>
            <View style={styles.button_normal}>
              <AntDesign name="delete" size={30} color="white" />
              <Text style={styles.button_text} >ביטול תור</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateExistApp()}>
            <View style={styles.button_normal}>
              <MaterialIcons name="update" size={30} color="white" />
              <Text style={styles.button_text} >עדכון תור</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => onShare()}>
            <View style={styles.button_normal}>
              <AntDesign name="sharealt" size={30} color="white" />
              <Text style={styles.button_text}>הזמן חבר לתרום</Text>
            </View>
          </TouchableOpacity>
        </View>
        {modalDel && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalDel}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>האם אתה בטוח\ה שתרצה\י לבטל את התור ?</Text>
                <View style={styles.modal_buttons}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalDelete(false),
                        deleteExistAppointment()
                    }}>
                    <Text style={styles.textStyle}>כן</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalDelete(false)}>
                    <Text style={styles.textStyle}>לא</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        )}
        {modalPassApp && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalPassApp}
              onRequestClose={() => { console.log('Modal has been closed.'); }}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>אין לך תור פעיל במערכת כרגע, אנא קבע\י תור חדש</Text>
                <View style={styles.modal_buttons}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalPassApp(!modalPassApp)}>
                    <Text style={styles.textStyle}>סגור</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => navigation.navigate("Stations", { route: User })}>
                    <Text style={styles.textStyle}>קבע תור חדש</Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  buttomContainer: {
    alignItems: 'center',
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
  medical_button: {
    alignItems: 'center',
    width: 160,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
    marginLeft: 100,
    marginRight: 100
  },
  textUnderCard: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  ButtonContainer: {
    flexDirection: 'row',
  },

  topContainer: {
    marginBottom: 20,
  },
  //Card
  paragraph: {
    margin: 5,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },

  title_active_app: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#32cd32",
    textAlign: 'center',
  },

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
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },

});
