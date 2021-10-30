import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const url = "http://proj13.ruppin-tech.co.il/"

export default function Stations({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  const [User, onChangeUser] = useState(route.params.route)
  const [AppointDate, onChangeDate] = useState()
  const [City, onChangeCity] = useState()
  const [Stations, setStations] = useState([
    { Station_code: '1', City: 'רעננה', F_address: 'הנכשלים 8', Start_time: '8', End_time: '16', Lat: '65.5575', Lng: '68.77676' },
    { Station_code: '2', City: 'רופין', F_address: 'חרוב 5', Start_time: '8', End_time: '12', Lat: '67.5775', Lng: '68.77676' },
  ])



  // var today = new Date();
  // var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  // var time = today.getHours() + ":" + today.getMinutes();
  // const dateTime = date + ' ' + time;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS !== 'web');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    onChangeDate(fDate)
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onFocus = () => {
    showDatepicker()
  }


  const ScheduleAppointment = (item) => {
    var route = { User: User, Station: item, DateTime: AppointDate }
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
      }
    } catch (error) {

    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.date_container}>
              <TouchableOpacity onPress={onFocus}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text} > תאריך התרמה</Text>
                </View>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={AppointDate}
                placeholder="תאריך"
              />
            </View>
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
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    padding: 50,
    flex: 1,
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  text: {
    borderBottomColor: 'black',
    width: 200,
    borderBottomWidth: 1,
    fontSize: 15,
  },
  date_container: {
    flexDirection: "row-reverse"
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
