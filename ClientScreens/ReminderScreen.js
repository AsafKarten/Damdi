import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';


export default function ReminderScreen({ route }) {
  const [appInfo, SetAppInfo] = useState(route.params.route);
  console.log(appInfo);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      }
    })();
  }, []);

  const addEventToCalendar = async () => {
    let appDate = new Date(appInfo.date)
    let endTime = new Date(appInfo.date)
    try {
      
      let result = await Calendar.createEventAsync("3", {//TODO Function to get id defult calendar
        startDate: new Date(appDate),
        endDate: new Date(endTime.setHours(endTime.getHours() + 1)),
        location: appInfo.location,
        title: "תרומת דם",
        timeZone: "GMT+2",
        alarms: [],//TODO: check how to add alarm
      })
      let event = await result
      if (event != null) {
        Alert.alert("האירוע נוסף ללוח השנה בהצלחה")
        Calendar.openEventInCalendar(event)//TODO that will give the user the ability to access the event in phone calendar, check the function
      }
    } catch (error) {
      console.log('failure', error);
    }
  }


  return (
    <View style={styles.container}>
      <Button title="הוסף תזכורת ללוח השנה שלך" onPress={() => addEventToCalendar()} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

// async function createCalendar() {
//   const defaultCalendarSource =
//     Platform.OS === 'ios'
//       ? await getDefaultCalendarSource()
//       : { isLocalAccount: true, name: 'Expo Calendar' };
//   const newCalendarID = await Calendar.createCalendarAsync({
//     title: 'Expo Calendar',
//     color: 'blue',
//     entityType: Calendar.EntityTypes.EVENT,
//     sourceId: defaultCalendarSource.id,
//     source: defaultCalendarSource,
//     name: 'internalCalendarName',
//     ownerAccount: 'personal',
//     accessLevel: Calendar.CalendarAccessLevel.OWNER,
//   });
//   console.log(`Your new calendar ID is: ${newCalendarID}`);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
