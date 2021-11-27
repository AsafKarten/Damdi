import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { url } from '../Utils';


export default function Stations({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);
  const [showCityList, setShowList] = useState(true);

  const [User, onChangeUser] = useState(route.params.route)
  const [AppointDate, onChangeDate] = useState()
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);
  const [Stations, setStations] = useState()


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
    GetStationList()
  }

  const serachCity = async (q) => {
    let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=351d4347-8ee0-4906-8e5b-9533aef13595&q=${q}`
    let res = await fetch(url);
    let data = await res.json();
    console.log(data.result.records);
    setCities(data.result.records)
  }

  const onFocusCity = () => {
    setShowList(true);
    setCities([])
  }

  useEffect(() => {
    serachCity(city)
  }, [city])


  const ScheduleAppointment = (item) => {
    var route = { User: User, Station: item, Date_Time: date }
    navigation.navigate('ScheduleAppointment', { route: route })
  }


  const GetStationList = async () => {
    try {
      let result = await fetch(url + "api/all/stations", {
        method: 'GET'
      });
      let data = [...await result.json()];
      setStations(data);
    } catch (error) {
      console.error(error)
    }
  }



  const searchStation = async () => {
    try {
      if (city == null || city == "" || AppointDate == null || AppointDate == "") {
        Alert.alert('שגיאה', 'אנא מלא/י את כל פרטים כדי לאתר תחנות התרמה')
        return;
      } else {
        let result = await fetch(url + "api/search/stations/city", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            City: city
          })
        });
        let data = [...await result.json()];
        console.log(data);
        setStations(data);
      }
    } catch (error) {
      Alert.alert("תקלה עם שליפת תחנות התרמה מהשרת, נסה מאוחר יותר", "אופס")
      console.log("תקלה עם שליפת תחנות מהשרת");
      console.log(error);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.inner}>
          <View style={styles.date_container}>
            <View style={styles.HorizontalBox}>
              <Text style={styles.lableText}>בחר תאריך</Text>
              <TextInput onFocus={onFocus}
                style={styles.input}
                value={AppointDate}
                placeholder="תאריך" />
            </View>
          </View>
          <View style={styles.HorizontalBox}>
            <Text style={styles.lableText}>עיר</Text>
            <TextInput
              onFocus={onFocusCity}
              style={styles.input}
              onChangeText={setCity}
              value={city}
              placeholder="עיר"
              maxLength={20}
            />
          </View>
          <View style={styles.container_city_list}>
            {cities.length > 0 ? cities.map(item =>
              <TouchableOpacity onPress={() => {
                setCity(item["שם יישוב"])
                setShowList(false)
              }} >
                {showCityList && <View style={styles.button_city_list}>
                  <Text style={styles.text_city_list}>{item["שם יישוב"]}</Text>
                </View>}
              </TouchableOpacity>)
              : null}
          </View>
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
                <Text>{item.Station_name}</Text>
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
  HorizontalBox: {
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  lableText: {
    marginTop: 17,
    fontSize: 16,
    fontWeight: 'bold'
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
    marginLeft: 50,
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
    alignItems: 'center',
    marginTop: 16,
    padding: 28,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black",
  },
  container_city_list: {
    marginRight: 100,
  },
  button_city_list: {
    borderWidth: 2
  },
  text_city_list: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  }
});
