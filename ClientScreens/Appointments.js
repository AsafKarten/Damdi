import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import { Card } from 'react-native-elements';

//Fix card style and show it if only hae a active appintment
const url = "http://proj13.ruppin-tech.co.il/"

export default function Appointments({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)
  const [hasApp, onChangeHasApp] = useState(false);
  const [dateApp, setDateApp] = useState()
  const [timeApp, setTimeApp] = useState()
  const [locationApp, setLocation] = useState()
  const [modalInfo, setModalInfo] = useState(false);

  var customDate = new Date(dateApp)
  var fDate = customDate.getDate() + '/' + (customDate.getMonth() + 1) + '/' + customDate.getFullYear()


  useEffect(() => {
    (async () => {
      await checkActiveAppinment()
    })()
  }, [navigation])

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
        onChangeHasApp(true);
        setDateApp(appintment.App_time.split(" ")[0])
        setTimeApp(appintment.App_time.split(" ")[1])

        await getStationName(appintment.Station_code)
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


  return (
    <SafeAreaView style={styles.container}>

      {hasApp && (
        <View style={styles.topContainer}>
          <Card elevation={7}>
            <Text style={styles.paragraph} >תור פעיל 1{"\n"}
              מיקום התחנה: {locationApp}{"\n"}
              בתאריך: {fDate}{"\n"}
              בשעה: {timeApp}
            </Text>
          </Card>
        </View>
      )}

      <View style={styles.buttomContainer}>
        <View style={styles.ButtonContainer}>

          <TouchableOpacity onPress={() => navigation.navigate('maps', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >נווט אל התחנה</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >הוסף תזכורת</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >ביטול תור</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text} >עדכון תור</Text>
            </View>
          </TouchableOpacity>

        </View>


        <View style={styles.line}>
          <TouchableOpacity onPress={() => navigation.navigate('AppointmentsHistory', { route: User })}>
            <View style={styles.button_normal}>
              <Text style={styles.button_text}>היסטורית התורים שלך</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  button_text: {
    fontSize: 18,
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
  }
});
