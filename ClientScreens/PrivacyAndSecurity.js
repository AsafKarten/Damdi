import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable } from 'react-native';

var bcrypt = require('bcryptjs');


export default function PrivacyAndSecurity({ navigation, route }) {
  const [prevDetails, setPrev] = useState(route.params.route);
  const [Email, onChangeEmail] = useState(route.params.route.Email);
  const [Salt, onChangeSalt] = useState(route.params.route.Salted_hash);
  const [Pass, onChangePass] = useState('');
  const [CPass, onChangeCPass] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [badEmail, setBadEmail] = useState();
  const [badPass, setBadPass] = useState();
  const storeData = async (data) => {
    try {
      const loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }


  const CheckDetails = () => {
    try {
      if (Platform.OS !== 'web') {
        setShouldShow(true)
      }
      let result = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: route.params.route.Personal_id
        })
      });
      let currentUser = await result.json();
      console.log(data);
      if (currentUser.Personal_id == prevDetails.Personal_id) {
        postEditDetiles()
      }
      if (currentUser.Salted_hash == prevDetails.Salted_hash || currentUser.Email == prevDetails.Email && currentUser.Personal_id !== prevDetails.Personal_id) {
        setBadEmail(Email)
        setBadPass(Pass)
        setModalVisible(true)
      }
      else {
        postEditDetiles()
      }
    } catch (e) {
      console.error(e);
    }
  }

  const postEditDetiles = async () => {
    if (!Pass == '') {
      if (Pass == CPass) {
        let salt = bcrypt.genSaltSync(10);
        let saltedHash = bcrypt.hashSync(Pass, salt);
        onChangeSalt(saltedHash)
      }
    }
    else {
      Alert.alert("Incorrect Password", "Password dose not match confirm password !")
    }
  }
  try {
    await clearAsyncStorage()
    //TODO: create a webAPI call to edit detiles
    let result = await fetch(url + "api/edit/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Personal_id: prevDetails.Personal_id,
        Email: Email,
        Salted_hash: Salt,
      })
    });
    let data = await result.json();
    await storeData(data);
    navigation.navigate("Profile", { user: data });
  } catch (e) {
    console.error(e)
  }


  return (
    <View style={styles.container}>
      <Text>עדכון אימייל וסיסמא</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={Email}
        secureTextEntry={true}
        placeholder="אימייל"
        leftIcon={<Icon name='lock' size={24} color='black' />}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={Pass}
        secureTextEntry={true}
        placeholder="סיסמא"
        leftIcon={<Icon name='lock' size={24} color='black' />}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeCPass}
        secureTextEntry={true}
        value={CPass}
        placeholder="אשר סיסמא"
        leftIcon={<Icon name='lock' size={24} color='black' />}
      />
      <TouchableOpacity onPress={() => CheckDetails()}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text}>שמור</Text>
        </View>
      </TouchableOpacity>
      {shouldShow ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>האימייל או הסיסמא שהכנסת קיימים, בחר אימייל או סיסמא שונים</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 30,
    width: 150,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_text: {
    color: 'white'
  },
  button_normal: {
    alignItems: 'center',
    width: 80,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
});