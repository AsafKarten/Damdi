
import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, Pressable, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { url } from '../Utils'

export default function AppListTwo({ navigation, route }) {
  const [fullData, setFullData] = useState([{App_id:1, Personal_id:204610624},{App_id:2, Personal_id:22},{App_id:3, Personal_id:33},])
  const [modalRefuse, setModalRefuseVis] = useState(false);
  const [Donator, setDonator] = useState(route.params.route.Donator)
  


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     // getAppointmentsList();
    });

    return unsubscribe;
  }, [navigation]);

  const getDonorInfo = async (Personal_id) => {
    try {
      // if (PersonalId === undefined || PersonalId === null || PersonalId === '') {
      //   Alert.alert("שגיאת התחברות", "אנא מלא/י תעודת זהות תורם !")
      //   console.log('====================================');
      //   console.log("Error, Empty field");
      //   console.log('====================================');
      //   return
      // }
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: Personal_id,
        })
      });
      let donor = await result.json();
      if (donor !== undefined || donor !== null) {
        const Route = { Donator: Donator, Donor: donor }
        navigation.navigate('UnitTwoMain', { route: Route })
      }
    } catch (error) {
      console.error(error);
    }
  }

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
      console.log(data);
      if (data.length === 0) {
        setModalRefuseVis(true);
        return;
      }
      else {
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
      }
      setFullData(arr)
      console.log(arr);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      
        <FlatList
          data={fullData}
          keyExtractor={(item) => item.App_id}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <Text onPress={()=>getDonorInfo(item.Personal_id) } style={styles.text_list}>{item.Personal_id}</Text>
            </View>
          )} />

        {modalRefuse && (
          <View>
            <Modal
              //animationType='fade'
              animationIn='zoomIn'
              animationOut='zoomOut'
              transparent={true}
              visible={modalRefuse}
              onRequestClose={() => { console.log('Modal has been closed.'); }}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>רשימת התורים ריקה, אין תורמים כעת.</Text>
                <View style={styles.modal_buttons}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalRefuseVis(!modalRefuse)
                      navigation.navigate('UnitOne')
                    }}>
                    <Text style={styles.textStyle}>סגור</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View >
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
    width:300,
    height:150,

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
    padding:20,
    //textAlign:'center',
    fontSize: 26,
   // fontWeight: 'bold',
    color:'black'
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
  },
  //Modal buttons 
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
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  buttonClose: {
    width: 120,
    backgroundColor: "white",
    opacity: 0.8,
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});



