import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Linking, TouchableOpacity, View, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';


export default function ReminderScreen({ route }) {
  const [appInfo, SetAppInfo] = useState(route.params.route);
  const [eventId, SetEventId] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        Calendar.getCalendarsAsync().
          then(calendars => {
            let array = calendars
            for (let index = 0; index < array.length; index++) {
              if (array[index].accessLevel === "owner") {
                SetEventId(array[index].id)
                console.log(eventId);
                return
              }
            }
          })
      }
    })();
  }, []);

  const addEventToCalendar = async () => {
    let appDate = new Date(appInfo.date)
    let endTime = new Date(appInfo.date)
    try {
      let result = await Calendar.createEventAsync(eventId, {
        startDate: new Date(appDate),
        endDate: new Date(endTime.setHours(endTime.getHours() + 1)),
        location: appInfo.location,
        title: "תרומת דם",
        timeZone: "GMT+2",
      })
      let event = result
      if (event != null) {
        Alert.alert("האירוע נוסף ללוח השנה בהצלחה")
        SetEventId(event)
      }
    } catch (error) {
      console.log('failure', error);
    }
  }

  const openEventInCal = () => {
    Linking.openURL('content://com.android.calendar/time/');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text_buttons}>להוספת התור ללוח השנה לחץ כאן</Text>
      <TouchableOpacity onPress={() => addEventToCalendar()}>
        <View style={styles.creat_button}>
          <Text style={styles.button_text} >הזכר לי</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.text_buttons}>לעריכת התזכורת לחץ כאן</Text>
      <TouchableOpacity onPress={() => openEventInCal()}>
        <View style={styles.creat_button}>
          <Text style={styles.button_text} >עריכת התזכורת</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
    //justifyContent: 'center',
  },
  creat_button: {
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
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  text_buttons: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
