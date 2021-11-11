import React, { useState } from 'react';
import { Share, View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, Modal } from 'react-native';

const url = "http://proj13.ruppin-tech.co.il/"
export default function Friends({ navigation, route }) {
  const [User, onChangeId] = useState(route.params.route)

  const inviteViaWhatsApp = async () => {
    alert('WhatsApp')
  };
  const inviteViaSMS = async () => {
    alert('SMS')
  };

  const inviteViaEmail = async () => {
    alert('Email')
  };

  const inviteViaFacebook = async () => {
    alert('Facebook')
  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={inviteViaWhatsApp}>
        <View style={styles.btn_whatsApp}>
          <Text style={styles.button_text}>הזמן חבר דרך ה- WhatsApp</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={inviteViaSMS}>
        <View style={styles.btn_sms}>
          <Text style={styles.button_text}>הזמן חבר דרך ה- SMS</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={inviteViaFacebook}>
        <View style={styles.btn_facebook}>
          <Text style={styles.button_text}>הזמן חבר דרך ה- Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={inviteViaEmail}>
        <View style={styles.btn_email}>
          <Text style={styles.button_text}>הזמן חבר דרך ה- Email</Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_whatsApp: {
    alignItems: 'center',
    width: 200,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "green",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },

  btn_sms: {
    alignItems: 'center',
    width: 200,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "grey",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },

  btn_facebook: {
    alignItems: 'center',
    width: 200,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "blue",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },

  btn_email: {
    alignItems: 'center',
    width: 200,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "red",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },

  button_text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
});
