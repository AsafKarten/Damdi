
import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { url } from '../Utils'

export default function AppList({ navigation }) {
  const [fullData, setFullData] = useState([])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAppointmentsList();
    });

    return unsubscribe;
  }, [navigation]);

  const getUserInfo = async (id) => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: id
        })
      });
      let user = await result.json();
      console.log(user);
      if (user !== undefined || user !== null) {
        let fullname = user.First_name + ' ' + user.Last_name
        console.log(fullname);
        return fullname
      }
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const getAppointmentsList = async () => {
    try {
      let result = await fetch(url + "api/all/appointments", {
        method: 'GET'
      });
      let data = [...await result.json()];
      let idApp = 0
      let arr = []
      for (let index = 0; index < data.length; index++) {
        let PID = data[index].Personal_id
        let fullname = await getUserInfo(PID)
        let timeapp = data[index].App_time
        let datetime = new Date(timeapp)
        var fTime = datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getFullYear() + " " + datetime.getHours() + ":" + datetime.getMinutes()
        let appObj = { id: ++idApp, time: fTime, name: fullname }
        arr.push(appObj);
      }
      setFullData(arr)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <FlatList
        data={fullData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text style={styles.text_list}>{item.time}  {item.name}</Text>
          </View>
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 14,
    padding: 18,
    borderWidth: 3,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black"
  },
  text_list: {
    fontSize: 16,
    fontWeight: 'bold',
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



