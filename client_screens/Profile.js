import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import PI from '../assets/DamdiPI4.png';


const api = "http://ruppinmobile.tempdomain.co.il/site15/"

export default function Profile({ navigation, route }) {
  let actionSheet = useRef();
  var optionArray = ['take a photo', 'choose from a gallery', 'Cancel'];
  const [userId, setUserId] = useState(route.params.route.Personal_id)
  const [image, setImage] = useState(PI);
  const [shouldShow, setShouldShow] = useState(false);


  useEffect(() => {
    (async () => {
      if (route !== undefined) {
        if (route.Profile_img.indexOf("?asid") == -1)
          setImage(`${route.Profile_img}?t=${Date.now()}`)
        setUserId(route.Personal_id)
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
      showActionSheet();
    }
  }

  const showActionSheet = () => {
    actionSheet.current.show();
  };

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
  const imageUpload = async (imgUri, picName) => {
    try {

      let res = await fetch(api + "api/uploadpicture", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uri: imgUri.split(',')[1],
          name: picName,
          folder: userId,
          type: 'jpg',
        })
      });
      let data = await res.json();
      if (data.path.indexOf("?asid") == -1)
        setImage(`${data.path}?t=${Date.now()}`)
      await updateLoggedUser(userId);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  const imageUploadA = async (imgUri, picName) => {
    try {
      let res = await fetch(api + "api/uploadpicture", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          uri: imgUri,
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
      if (data.Profile_img.indexOf("?asid") == -1)
        data.Profile_img = `${data.Profile_img}?t=${Date.now()}`;
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

        <Text style={styles.addText}>{route.First_name + " " + route.Last_name}</Text>

        <Text style={styles.addText}>סוג דם: -O</Text>

      </View>

      <View style={styles.ButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('PersonalForm', { route: route })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >עדכון פרטים אישיים</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { route: route })}>
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
          <ActionSheet
            ref={actionSheet}
            title={'בחר/י מאיפה לעלות תמונה'}
            // Options Array to show in bottom sheet
            options={optionArray}
            // Define cancel button index in the option array
            // This will take the cancel option in bottom
            // and will highlight it
            cancelButtonIndex={2}
            // Highlight any specific option
            destructiveButtonIndex={1}
            onPress={(index) => {
              if (index == 0) {
                takePicture();
              }
              else if (index == 1) {
                GalleryPicture();
              }
            }}
          />
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
  }
});
