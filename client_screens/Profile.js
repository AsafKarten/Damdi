import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Image, Modal, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import Spiner from '../Componentes/Spiner';

const url = "http://proj13.ruppin-tech.co.il/"

export default function Profile({ navigation, route }) {
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [User, onChangeUser] = useState(route.params.route)
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      if (User !== undefined) {
        // if (User.Profile_img.indexOf("?asid") == -1)
        //   setImage(`${User.Profile_img}?t=${Date.now()}`)
        setUserId(User.Personal_id)
      }
      if (Platform.OS !== 'web') {
        setShouldShow(true)
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need media permissions to make this work!');
        }
      }
    })()
  }, [])


  const checkDevice = async () => {
    if (Platform.OS === 'web') {
      await GalleryPicture();
    }
    else {
      setModalVisible(true);
    }
  }


  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1
      });
      if (!result.cancelled) {
        if (Platform.OS !== 'web') {
          const content = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });
          result.uri = content
          await imageUploadA(result.uri, userId)
        }
        else {
          await imageUpload(result.uri, userId);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }


  const GalleryPicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7
      });
      if (!result.cancelled) {
        if (Platform.OS !== 'web') {
          setLoading(true);
          var content = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });
          result.uri = content
          await imageUploadA(result.uri, userId)
        }
        else {
          setLoading(true);
          await imageUpload(result.uri, userId);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  const imageUpload = async (imgUrl, picName) => {
    try {

      let res = await fetch(url + "api/uploadpicture", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uri: imgUrl.split(',')[1],
          name: picName,
          folder: userId,
          type: 'jpg',
        })
      });
      let data = await res.json();
      // if (data.path.indexOf("?asid") == -1)
      //   setImage(`${data.path}?t=${Date.now()}`)
      await updateLoggedUser(userId);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  const imageUploadA = async (imgUrl, picName) => {
    try {
      let res = await fetch(url + "api/uploadpicture", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uri: imgUrl,
          name: picName,
          folder: userId,
          type: 'jpg',
        })
      });
      let data = await res.json();
      //if (data.path.indexOf("?asid") == -1)
      await setImage(`${data.path}?t=${Date.now()}`)
      await updateLoggedUser(userId);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  const updateLoggedUser = async () => {
    try {
      let result = await fetch(api + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Id_user: userId,
        })
      });
      let data = await result.json();
      // if (data.Profile_img.indexOf("?asid") == -1)
      //   data.Profile_img = `${data.Profile_img}?t=${Date.now()}`;
      storeData(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopContainer}>
        <Image style={styles.profile_image} source={{ uri: image }} />
        <TouchableOpacity
          onPress={checkDevice}>
          <Text>
            <Text style={styles.addText}>תמונת פרופיל</Text>
            <AntDesign name="plus" size={24} color="grey" fontWeight={'bold'} />
          </Text>
        </TouchableOpacity>
        {shouldShow ? (
          <Spiner loading={loading} />
        ) : null}
        <Text style={styles.addText}>{User.First_name + " " + User.Last_name}</Text>

        <Text style={styles.addText}>סוג דם: O-</Text>

      </View>

      <View style={styles.ButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('PersonalFormA', { route: route })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >עדכון פרטים אישיים</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MedicalForm', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >עדכון פרטים רפואים</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: route })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >אבטחה ופרטיות</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: route })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >הגדרות</Text>
          </View>
        </TouchableOpacity>

      </View>
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
              <Text style={styles.modalText}>בחר\י מהיכן להעלאות תמונת פרופיל</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => GalleryPicture()}>
                  <Text style={styles.textStyle}>בחר\י מהגלריה</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => takePicture()}>
                  <Text style={styles.textStyle}>צלמ\י עכשיו</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopContainer: {
    flexWrap: 'wrap',
    padding: 8,
    margin: 8,
    padding: 10,
    margin: 5
  },
  profile_image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderRadius: 90,
    borderColor: 'red',
    resizeMode: 'stretch',

  },
  addText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ButtonContainer: {
    flexDirection: 'row'
  },
  input: {
    height: 30,
    width: 150,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
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
    color: 'white'
  },

  //upload image Modal
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
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});
