import React, { useState, useEffect } from 'react';
import { View, BackHandler, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Spiner from './Spiner';
import BG_ONLY from '../assets/BG_ONLY.jpg';

export default function MainScreen({ navigation }) {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("רגע רגע", "בטוח שאת/ה רוצה לצאת מהאפליקציה?!", [
        {
          text: "ביטול",
          onPress: () => null,
          style: "cancel"
        },
        { text: "כן", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <ImageBackground source={BG_ONLY} style={styles.BGimage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <TouchableOpacity onPress={() => navigation.navigate('DonatorsLogin')}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text}>כניסת מתרים</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
                <View style={styles.button_normal}>
                  <Text style={styles.button_text}>כניסת מנהל מערכת</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  BGimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
