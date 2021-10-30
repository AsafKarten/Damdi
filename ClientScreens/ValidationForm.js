import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Switch, Modal, TouchableHighlight, Platform, } from 'react-native';

export default function ValidationFrom({ navigation, route }) {
  const [shouldShow, setShouldShow] = useState(false);
  const [confirmModal, setConfirm] = useState(false);
  const [notForUse, onChangeNFU] = useState(false);
  const togglenotForUse = () => onChangeNFU(previousState => !previousState);

  const [User, onChangeUser] = useState(route.params.route)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        setShouldShow(true)
        setConfirm(true)
      }
    })()
  }, [])

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם קיבלת טיפול בהורמון גדילה ממקור אנושי או עברת השתלת קרומי מח או קרנית, ממקור אנושי?</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={togglenotForUse}
              value={notForUse}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם במשפחתך הקרובה יש מחלת עצבים בשם: "קרויצפלד-יעקב" או נאמר לך שבמשפחתך קיים סיכון למחלה זו?</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={togglenotForUse}
              value={notForUse}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם שהיית בבריטניה בפרק זמן מצטבר של 6 חודשים בין השנים 1980 – 1996 או קיבלת עירוי דם</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={togglenotForUse}
              value={notForUse}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם אחד מהמצבים הבאים חל עליך??
              {"\n"}
              קבלת תשלום עבור יחסי מין
              {"\n"}
              את/ה או בן/בת זוגך נבדקתם ונמצאתם חיובים לנוכחות נגיף האיידס (HIV)
              {"\n"}
              את/ה חולה המופיליה
              {"\n"}
              הזרקת תרופות ללא מרשם רופא (כולל סטרואידים אנבולים)
              {"\n"}
              שימוש בסמים בהזרקה או ב"הסנפה"
              {"\n"}
              את/ה נשא/ית של דלקת כבד (הפטיטיס-"צהבת") מסוג B או C
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={togglenotForUse}
              value={notForUse}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>
              האם אחד מהמצבים הבאים חל עליך?
              {"\n"}
              שהייה מעל שנה בארץ בה שכיחות האיידס גבוהה וטרם עברו 12 חודשים מאז עזיבת האזור האנדמי
              {"\n"}
              קיום יחסי מין בין גברים ב 12 החודשים האחרונים
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={togglenotForUse}
              value={notForUse}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>
              האם קיימות סיבות אישיות או אחרות, שבגללן לא ניתן להשתמש במנת הדם שתתרום לעירוי לחולה
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Text>לא לעירוי!</Text>
            <Switch
              onValueChange={togglenotForUse}
              value={notForUse}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home', { route: User })}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >סיום</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {shouldShow ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View >
            <View >
              <View style={styles.modal}>
                <View >
                  <Text style={styles.text}>חלק ב' המצבים בהם אסור להשתמש במנת הדם:
                    {"\n"}
                    אם אחד המצבים המפורטים בהמשך חל עליך, אל תתרום/תתרמי דם או סמן/י בהמשך שהמנה לא לעירוי.
                    מנה זו לא תינתן לחולה כדי לא לסכן את בריאותו.
                    {"\n"}
                    זכאותך לביטוח דם תשמר, כמקובל.</Text>
                </View>
              </View>
              <TouchableHighlight
                style={{ backgroundColor: '#4d5b70' }}
                onPress={() => {
                  setConfirm(!confirmModal);
                }}>
                <Text style={styles.text} >סגור</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: 380,
  },
  textBox: {},
  text: {
    fontSize: 20,
  },
  checkboxContainer: {},
  checkbox: {
    marginRight: 5,
  },
  modal: {
    fontSize: 20,
    backgroundColor: '#eee'
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
    shadowRadius: 5
  },
  button_text: {
    color: 'white'
  },

});