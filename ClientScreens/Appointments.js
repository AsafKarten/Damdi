import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Modal, Pressable, Share } from 'react-native'
import { Card } from 'react-native-elements';
import { url } from '../Utils';

export default function Appointments({ navigation, route }) {
  const [hasApp, onChangeHasApp] = useState(false);
  const [modalDel, setModalDelete] = useState(false)
  const [modalInfo, setModalInfo] = useState(false);

  const [User, onChangeId] = useState(route.params.route)
  const [app_id, setAppintmentId] = useState();
  const [locationApp, setLocation] = useState()
  const [fullDate, setFullDate] = useState();



  var customDate = new Date(fullDate)
  var fDate = customDate.getDate() + '/' + (customDate.getMonth() + 1) + '/' + customDate.getFullYear()

  var customTime = new Date(fullDate)
  var fTime = customTime.getHours() + ":" + customTime.getMinutes()


  useEffect(() => {
    (async () => {
      setModalDelete(false)
      await checkActiveAppinment()
    })()
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkActiveAppinment()
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
      console.log(stationData);
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
      if (appintment !== "Appintment not found") {
        setFullDate(appintment.App_time)
        setAppintmentId(appintment.App_id)
        await getStationName(appintment.Station_code)
        onChangeHasApp(true);
      }
      else {
        setModalInfo(true)
        onChangeHasApp(false);
        return
      }
    } catch (error) {
      Alert.alert("תקלה עם שליפת תחנות התרמה מהשרת, נסה מאוחר יותר")
      console.log("תקלה עם שליפת תחנות מהשרת");
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
      Alert.alert("הודעת מערכת", "תור הוסר בהצלחה,תזכרו תרומת דם מצילה חיים!")
      onChangeHasApp(false)
    } catch (error) {
      console.log("Failed to delete Exist Appointment");
    }
  }

  const moveToReminder = () => {
    var data = { location: locationApp, date: fullDate }
    navigation.navigate('ReminderScreen', { route: data })
  }

  const onShare = async () => {
    try {
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


  return (
    <SafeAreaView style={styles.container}>

      {hasApp && (
        <View style={styles.topContainer}>
          <Card elevation={7}>
            <Text style={styles.paragraph} >תור פעיל{"\n"}
              מיקום התחנה: {locationApp}{"\n"}
              בתאריך: {fDate}{"\n"}
              בשעה: {fTime}
            </Text>
          </Card>
          <Text style={styles.textUnderCard}>שים לב !</Text>
          <Text style={styles.textUnderCard}>לא לשכוח למלא את הטופס הרפואי בסמוך למועד התור</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MedicalForm', { route: User })}>
            <View style={styles.medical_button}>
              <Text style={styles.button_text} >מילוי שאלון רפואי</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttomContainer}>
        <View style={styles.ButtonContainer}>

          <TouchableOpacity onPress={() => navigation.navigate('Maps', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >נווט אל התחנה</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => moveToReminder()}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >הוסף תזכורת</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={() => hasApp ? setModalDelete(true) : setModalInfo(true)}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >ביטול תור</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Stations', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >עדכון תור</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => onShare()}>
            <View style={styles.button_normal}>
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
        {modalInfo && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalInfo}
              onRequestClose={() => { console.log('Modal has been closed.'); }}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>אין לך תור פעיל במערכת כרגע, אם חלפו 3 חודשים מהתרומה האחרונה, קבע\י תור חדש</Text>
                <View style={styles.modal_buttons}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalInfo(!modalInfo)}>
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
    backgroundColor: "#87F387",
    margin: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',

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
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
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
