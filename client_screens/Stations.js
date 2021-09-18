import React, { useState } from 'react';
import { DateTime, View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import DatePicker from 'react-native-neat-date-picker'

const url = "http://proj13.ruppin-tech.co.il/"


export default function Stations({ navigation, route }) {
  const [User, onChangeUser] = useState(route.params.route)
  const [AppointDate, onChangeDate] = useState()
  const [City, onChangeCity] = useState()
  const [Stations, setStations] = useState([
    { Station_code: '1', City: 'רעננה', F_address: 'הנכשלים 8', Start_time: '8', End_time: '16', Lat: '65.5575', Lng: '68.77676' },
    { Station_code: '2', City: 'רופין', F_address: 'חרוב 5', Start_time: '8', End_time: '12', Lat: '67.5775', Lng: '68.77676' },
  ])
  const [showDatePicker, setShowDatePicker] = useState(false)


  var today = new Date();
  var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();
  const dateTime = date + ' ' + time;
  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    setShowDatePicker(false)
  }

  const onConfirm = (date) => {
    setShowDatePicker(false)
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(date.getDate())
  }
  const ScheduleAppointment = (item) => {
    var route = { User: User, Station: item, DateTime: dateTime }
    navigation.navigate('ScheduleAppointment', { route: route })
  }

  const searchStation = async () => {
    try {
      if (City == null || City == "" || AppointDate == null || AppointDate == "") {
        Alert.alert('שגיאה', 'אנא מלא/י את כל פרטים כדי לאתר תחנות התרמה')
        return;
      } else {
        let result = await fetch(url + "api/search/stations", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            City: City,
            Start_time: AppointDate
          })
        });
        let data = [...await result.json()];
        setStations(data);
        console.log('====================================');
        console.log(Stations);
        console.log('====================================');
      }
    } catch (error) {

    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={openDatePicker}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} > תאריך התרמה</Text>
              </View>
            </TouchableOpacity>
            <DatePicker
              isVisible={showDatePicker}
              mode={'single'}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeDate}
              value={AppointDate}
              placeholder="תאריך"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeCity}
              value={City}
              placeholder="עיר/ישוב"
            />
            <TouchableOpacity onPress={() => searchStation()}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >חיפוש</Text>
              </View>
            </TouchableOpacity>

            <FlatList
              data={Stations}
              keyExtractor={(item) => item.Station_code}
              renderItem={({ item }) => (
                <View style={styles.list}>
                  <Text>{item.City}</Text>
                  <Text>{item.F_address}</Text>
                  <Text>{item.Start_time + " - " + item.End_time}</Text>
                  <TouchableOpacity onPress={() => ScheduleAppointment(item)}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >הזמן/י תור</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 50,
    flex: 1,
    justifyContent: "space-around"
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
    color: 'white'
  },
  list: {
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 16,
    padding: 28,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black",
  },
});
