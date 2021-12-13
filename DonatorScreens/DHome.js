import React, { useState, useEffect } from 'react';
import { View, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { url } from '../Utils'
import { Dropdown } from 'react-native-element-dropdown';

export default function Home({ navigation, route }) {
  const [Donator, onChangeDonator] = useState(route.params.route)
  const [roleModal, setRoleModal] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
  const [selectedSiteDonation, setSelectedSiteDonation] = useState();
  const [stations, setStations] = useState([])
  const [stationName, setStationName] = useState();
  const [stationCode, setStationCode] = useState();
  const [isFocus, setIsFocus] = useState(false);


  useEffect(() => {
    GetStationList();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRoleModal(false)
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setRoleModal(false)
  }, [navigation]);

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

  const DropdownComponent = () => {
    const renderLabel = () => {
      if (stationName || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            שם תחנה
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={{
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        width: 250,
      }} >
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stations}
          search
          searchPlaceholder="חפש תחנה..."
          maxHeight={200}
          labelField="Station_name"
          valueField="Station_code"
          placeholder={!isFocus ? 'בחר תחנה' : '...'}
          value={stations}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setStationName(item.Station_name);
            setStationCode(item.Station_code);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };


  return (
    <SafeAreaView>
      <View style={styles.container_btn_exit}>
        <TouchableOpacity onPress={() => navigation.navigate("DonatorsLogin")}>
          <View style={styles.button_logout}>
            <Ionicons name="exit-outline" size={24} color="white" />
            <Text style={styles.button_text_exit} >התנתק</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.text_container}>
        <Text style={styles.text_top_user}>מחובר כעת {Donator.First_name} {Donator.Last_name} (פארמדיק)</Text>
        <Text style={styles.text_top_user}>אתר התרמה:  {selectedSiteDonation}</Text>
      </View>
      <View style={styles.containr_btn}>
        <TouchableOpacity onPress={() => {
          setRoleModal(true)
        }}>
          <View style={styles.button_normal}>
            <AntDesign name="select1" size={24} color="white" />
            <Text style={styles.button_text} >בחירת עמדה</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSiteModal(true)}>
          <View style={styles.button_normal}>
            <FontAwesome name="exchange" size={24} color="white" />
            <Text style={styles.button_text} >שינוי אתר התרמה</Text>
          </View>
        </TouchableOpacity>
      </View>
      {roleModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={roleModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalView} >
            <View >
              <Text style={styles.modalText}>{Donator.First_name + " " + Donator.Last_name}</Text>
              <Text style={styles.modalText} >בחר עמדה</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setRoleModal(false)
                  navigation.navigate('UnitOne', { route: Donator, siteCode: stationCode})
                }}>
                <Text style={styles.textStyle}>עמדה 1           קבלת תורמים ותשאול</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setRoleModal(false)
                  navigation.navigate('UnitTwo', { route: Donator })
                }}>
                <Text style={styles.textStyle}>עמדה 2           בדיקת לחץ דם והמוגלובין</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setRoleModal(false)
                  navigation.navigate('UnitThree', { route: Donator, siteName: stationName})
                }}>
                <Text style={styles.textStyle}>עמדה 3            לקיחת תרומות דם</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setRoleModal(!roleModal)}>
              <Text style={styles.textStyle}>סגור</Text>
            </Pressable>
          </View>
        </Modal>
      )}
      {siteModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={siteModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalView} >
            <View >
              <Text style={styles.modalText} >בחר אתר התרמה {Donator.First_name + " " + Donator.Last_name} : </Text>
              {DropdownComponent()}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSiteModal(!siteModal)
                  setSelectedSiteDonation(stationName !== '...' ? stationName : "לא נבחר אתר התרמה")
                }}>
                <Text style={styles.textStyle}>בחר</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  containr_btn: {
    alignSelf: 'center',
    marginTop: 35,
    flexDirection: 'row'
  },
  ButtonContainer: {
    flexDirection: 'row'
  },
  container_btn_exit: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  text_container: {
    marginRight: 15
  },
  input: {
    height: 40,
    width: 220,
    margin: 14,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_normal: {
    alignItems: 'center',
    width: 90,
    height: 90,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
  },
  //Modal
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
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  button: {
    marginTop: 40,
    marginLeft: 50,
    marginRight: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",

  },
  buttonClose: {
    width: 120,
    backgroundColor: "white",
    opacity: 0.8,

  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  text_top_user: {
    color: "red",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 17,
  },
  modalText: {
    color: "black",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  button_logout: {
    alignItems: 'center',
    width: 100,
    margin: 10,
    marginTop: -10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
    flexDirection: 'row'
  },
  button_text_exit: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  //Dropdown
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontColor: "black",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    fontColor: "black",
  },
  selectedTextStyle: {
    fontColor: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
