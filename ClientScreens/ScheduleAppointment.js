import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, StyleSheet, Text, TouchableOpacity, Alert, FlatList } from 'react-native';

const url = "http://proj13.ruppin-tech.co.il/"


export default function ScheduleAppointment({ navigation, route }) {

  const [User, onChangeUser] = useState(route.params.route.User)
  const [AppointDate, onChangeDate] = useState()
  const [Station, onChangeStation] = useState(route.params.route.Station)
  const [Appointment, onChangeApp] = useState({})
  const [appointmentsTime, onChangeAppTime] = useState()
  const [confirmModal, setConfirm] = useState(false);
  const [Item, setItem] = useState(route.params.route.Station);


  useEffect(() => {
    DayValidation()
  }, [])

  const ScheduleApp = (item) => {
    setItem(item)
    setConfirm(true)
    let time = new Date()
    time = route.params.route.Date_Time
    time.setUTCHours(item.hour, item.Minutes, 0, 0)
    console.log(time);
    onChangeDate(time)
    const appointment = { Station_code: route.params.route.Station.Station_code, Personal_id: route.params.route.User.Personal_id, App_time: time }
    onChangeApp(appointment)
    console.log(appointment);
    console.log(Appointment);
    if (Platform.OS !== 'web') {
      setConfirm(true)
    }
    else {
      console.log(item.date + " " + item.time)
    }
  }

  const DayValidation = () => {
    var dayCheck = new Date(route.params.route.Date_Time)
    var intDay = dayCheck.getDay()
    var workDays = route.params.route.Station.Days
    let valid = false
    for (let index = 0; index < workDays.length; index++) {
      let currentDay = parseInt(workDays.charAt(index))
      if (currentDay == intDay) {
        valid = true
      }
    }
    if (valid) {
      SetTimes()
      console.log("day is currect" + " " + intDay + " " + workDays);
    }
    else {
      Alert.alert("התחנה לא עובדת בתאריך שבחרת, נסה תאריך אחר בבקשה")
      console.log("the asked date is`nt a work day at the station plese try another date");
    }
  }

  const SetTimes = () => {
    let id = 0
    var times = []
    let st = parseInt(Station.Start_time)
    console.log(st);
    let et = parseInt(Station.End_time)
    console.log(Station.Start_time + " " + Station.End_time);

    for (let index = st; index <= et; index++) {
      for (let i = 0; i < 3; i++) {
        let min = 0

        if (i == 0) {
          min = '00'
        }
        else if (i == 1) {

          min = 20
        }
        else {
          if (index == et) {
            min = 30
          }
          else {
            min = 40
          }

        }
        let time = route.params.route.Date_Time
        var app_time = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
        var tempAppoint = { id: id, date: app_time, hour: index, Minutes: min }
        times.push(tempAppoint)
        id++

      }
    }
    onChangeAppTime(times)
    console.log(times);
  }

  // const SetTimes = () => {
  //   let id = 0
  //   var times = []
  //   let st = parseInt(Station.Start_time)
  //   console.log(st);
  //   let et = parseInt(Station.End_time)
  //   console.log(Station.Start_time + " " + Station.End_time);
  //   var baseTime = new Date(route.params.route.Date_Time)
  //   baseTime.setHours(st)
  //   baseTime.setMinutes(0)
  //   baseTime.setSeconds(0)

  //   for (let index = st; index <= et; index++) {

  //     for (let i = 0; i < 3; i++) {


  //       if (i == 0) {
  //         baseTime.setMinutes(0)
  //       }
  //       else if (i == 1) {
  //         baseTime.setMinutes(20)
  //       }
  //       else {
  //         baseTime.setMinutes(40)
  //       }
  //       console.log(id + " " + baseTime);
  //       var app_time = baseTime.getDate() + '/' + (baseTime.getMonth() + 1) + '/' + baseTime.getFullYear() + "   " + baseTime.getHours() + ':' + baseTime.getMinutes();
  //       var tempAppoint = { id: id, time:baseTime,str_time: app_time }
  //       times.push(tempAppoint)
  //       id++
  //       if (i == 2) {
  //         baseTime.setHours(index + 1)
  //         baseTime.setMinutes(0)
  //         baseTime.setSeconds(0)
  //       }
  //     }
  //   }
  //   onChangeAppTime(times)
  //   console.log(times);
  // }


  const PostAppointmentToDB = async () => {
    let time = AppointDate
    console.log(time);
    try {
      let result = await fetch(url + "api/appointment/post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Station_code: route.params.route.Station.Station_code,
          Personal_id: route.params.route.User.Personal_id,
          App_time: time
        })
      })
      let respone = await result.json()
      console.log(respone);
    } catch (error) {
      console.log('error with the send data to server ')
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointmentsTime}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text style={styles.appText}>{"בתאריך " + item.date + "            " + "בשעה: " + item.hour + ":" + item.Minutes}</Text>
            <TouchableOpacity onPress={() => ScheduleApp(item)}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >הזמן/י תור</Text>
              </View>
            </TouchableOpacity>
          </View>
        )} />

      {confirmModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View >
            <View style={styles.modalView}>
              <View >
                <Text style={styles.modalText}>הזמנת תור לתרומת דם {"\n"}
                  בתחנת: {route.params.route.Station.Station_name}{"\n"}
                  בכתובת:  {route.params.route.Station.F_address + " " + route.params.route.Station.City}{"\n"}
                  בשעה: {Item.hour + ":" + Item.Minutes}{"\n"}
                  אנא וודא\י שפרטיך הרפואיים מעודכנים בסמוך למועד התור.
                </Text>
                <Text style={styles.modalText}>לאישור התור לחץ</Text>
                <TouchableHighlight
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    PostAppointmentToDB()
                    navigation.navigate("MedicalForm", { route: User })
                  }}>
                  <Text style={styles.modal_butons_text}>אישור</Text>
                </TouchableHighlight>
                <Text style={styles.modalTextCancel}>לביטול הפעולה</Text>
                <TouchableHighlight
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { setConfirm(!confirmModal); }}>
                  <Text style={styles.modal_butons_text}>ביטול</Text>
                </TouchableHighlight>
              </View>
              <TouchableHighlight
                style={[styles.button, styles.buttonClose]}
                onPress={() => { setConfirm(!confirmModal); }}>
                <Text style={styles.modal_butons_text}>סגור</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
    width: 160,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
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
  appText: {
    fontSize: 20,
    flexDirection: 'row-reverse',
  },

  // Modal
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
  modal_butons_text: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    margin: 5,
    borderRadius: 20,
    padding: 15,
    elevation: 1,
    alignItems: "center",
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
    textAlign: "center"
  },
  modalText: {
    color: "white",
    fontSize: 19,
    marginBottom: 5,
    textAlign: "center",
  },
  modalTextCancel: {
    color: "red",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  }
});