import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableHighlight, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native';


const url = "http://proj13.ruppin-tech.co.il/"

export default function UnitThree({ navigation, route }) {
  const [Donator, onChangeDonator] = useState(route.params.route)
  const [roleModal, setRoleModal] = useState(false);



  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => setRoleModal(true)}>
        <View style={styles.button_normal}>

          <Text style={styles.button_text} >בחירת עמדה</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >שינוי אתר התרמה</Text>
        </View>
      </TouchableOpacity>

      {roleModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={roleModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View >
            <View >
              <View style={styles.list}>
                <View >
                  <Text >{Donator.First_name + " " + Donator.Last_name}</Text>
                  <Text>בחר עמדה</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >עמדה 1</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('UnitTwo', { route: Donator })}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >עמדה 2</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('UnitThree', { route: Donator })}>
                    <View style={styles.button_normal}>
                      <Text style={styles.button_text} >עמדה 3</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableHighlight
                style={{ backgroundColor: '#4d5b70' }}
                onPress={() => {
                  setRoleModal(!roleModal);
                }}>
                <Text>סגור</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      ) : null}


    </SafeAreaView >

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row'
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
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
});