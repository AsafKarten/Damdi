import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, Image, Modal, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Spiner from '../Componentes/Spiner';
import { url } from '../Utils';

export default function Profile({ navigation, route }) {
  const [loading, setLoading] = useState(false);

  const [shouldShow, setShouldShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [User, setUser] = useState()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [bloodType, setBloodType] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    setUser(route.params.route === undefined ? null : route.params.route)
  }, [])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUser(route.params.route === undefined ? null : route.params.route)
      setFirstName(User !== undefined ? route.params.route.First_name : "")
      setLastName(User !== undefined ? route.params.route.Last_name : "")
      setBloodType(User !== undefined ? route.params.route.Blood_type : "")
      setImage(User !== undefined ? route.params.route.Profile_img : null)
      setLoading(false)
    });
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    (async () => {
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
          await imageUploadAndroid(result.uri, route.params.route.Personal_Id)
        }
        else {
          await imageUpload(result.uri, route.params.route.Personal_Id);
        }
      }
    } catch (e) {
      console.error("error with take a live picture");
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
          await imageUploadAndroid(result.uri, User.First_name)
        }
        else {
          setLoading(true);
          await imageUpload(result.uri, User.First_name);
        }
      }
    } catch (e) {
      console.error("Error with upload image from gallery");
    }
  }


  const imageUpload = async (imgUri, picName) => {
    try {
      let res = await fetch(url + "api/uploadpicture", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uri: imgUri.split(',')[1],
          name: picName,
          folder: route.params.route.Personal_Id,
          type: 'jpg',
        })
      });
      let data = await res.json();
      console.log("imageUpload", data);
      setLoading(false);
    } catch (e) {
      console.error("error with upload profile image");
    }
  }

  const imageUploadAndroid = async (imgUri, picName) => {
    try {
      console.log(route.params.route.Personal_Id);
      let res = await fetch(url + "api/uploadpicture", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uri: imgUri,
          name: picName,
          folder: route.params.route.Personal_Id,
          type: 'jpg',
        })
      });
      let data = await res.json();
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.error("error with upload profile image");
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopContainer}>
        <Image style={styles.profile_image} source={{ uri: image }} />
        <TouchableOpacity onPress={() => checkDevice()}>
          <Text style={styles.addText}> <AntDesign name="camera" size={24} color="grey" fontWeight={'bold'} />    הוספ\י תמונה</Text>
        </TouchableOpacity>
        {loading && <Spiner loading={loading} />}
        <Text style={styles.addText}>{firstName + " " + lastName}</Text>

        <Text style={styles.addText}>{bloodType} : סוג דם</Text>

      </View>

      <View style={styles.ButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('PersonalFormA', { route: User, modalStatus: "none" })}>
          <View style={styles.button_normal}>
            <Entypo name="edit" size={22} color="white" />
            <Text style={styles.button_text} >עדכון פרטים אישיים</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MedicalForm', { route: User })}>
          <View style={styles.button_normal}>
            <Entypo name="edit" size={22} color="white" />
            <Text style={styles.button_text} >עדכון פרטים רפואים</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyAndSecurity', { route: User })}>
          <View style={styles.button_normal}>
            <MaterialIcons name="security" size={24} color="white" />
            <Text style={styles.button_text} >אבטחה ופרטיות</Text>
          </View>
        </TouchableOpacity>
      </View>
      {shouldShow && (
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
      )}
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
    width: 110,
    height: 110,
    borderRadius: 400,
    borderColor: 'red',
    resizeMode: 'stretch',
    marginLeft: 15
  },
  addText: {
    textAlign: 'right',
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
    height: 100,
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
    textAlign: 'center'
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
    backgroundColor: "white",
  },
  textStyle: {
    color: "black",
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
