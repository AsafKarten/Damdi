import React, { useState, useEffect } from 'react';
import Spiner from '../Componentes/Spiner';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Switch, Modal, TouchableHighlight, Platform, Pressable } from 'react-native';

const url = "http://proj13.ruppin-tech.co.il/"

export default function ValidationFrom({ navigation, route }) {
  const [shouldShow, setShouldShow] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notForUse, onChangeNFU] = useState(false);
  const togglenotForUse = () => onChangeNFU(previousState => !previousState);

  const [notForUse1, onChangeNFU1] = useState(false);
  const [notForUse2, onChangeNFU2] = useState(false);
  const [notForUse3, onChangeNFU3] = useState(false);
  const [notForUse4, onChangeNFU4] = useState(false);
  const [notForUse5, onChangeNFU5] = useState(false);
  const [notForUse6, onChangeNFU6] = useState(false);

  const toggle1 = () => onChangeNFU1(previousState => !previousState);
  const toggle2 = () => onChangeNFU2(previousState => !previousState);
  const toggle3 = () => onChangeNFU3(previousState => !previousState);
  const toggle4 = () => onChangeNFU4(previousState => !previousState);
  const toggle5 = () => onChangeNFU5(previousState => !previousState);
  const toggle6 = () => onChangeNFU6(previousState => !previousState);
  const [User, onChangeUser] = useState()
  const [formNote, onChangeNote] = useState()


  useEffect(() => {
    if (Platform.OS !== 'web') {
      onChangeUser(route.params.route)
      setShouldShow(false);
      setLoading(false);
    }
  }, [])

  const validationForm = () => {
    if (Platform.OS !== 'web') {
      setLoading(true);
    }
    let note = ""
    if (notForUse1 == true) {
      onChangeNFU(true)
      note = "קיבלת טיפול בהורמון גדילה ממקור אנושי או עברת השתלת קרומי מח או קרנית, ממקור אנושי"
    }
    if (notForUse2 == true) {
      onChangeNFU(true)
      note += " , " + "במשפחתי הקרובה יש מחלת עצבים בשם: 'קרויצפלד-יעקב' או נאמר לי שבמשפחתי קיים סיכון למחלה זו"
    }
    if (notForUse3 == true) {
      onChangeNFU(true)
      note += " , " + "שהיתי בבריטניה בפרק זמן מצטבר של 6 חודשים בין השנים 1980 – 1996 או קיבלת עירוי דם"
    }
    if (notForUse4 == true) {
      onChangeNFU(true)
      note += " , " + ":חיובי/ת לאחד או יותר מן הסעיפים"
      note += ", קבלת תשלום עבור יחסי מין"
      note += ", את/ה או בן/בת זוגך נבדקתם ונמצאתם חיובים לנוכחות נגיף האיידס (HIV)"
      note += ", את/ה חולה המופיליה"
      note += ", הזרקת תרופות ללא מרשם רופא (כולל סטרואידים אנבולים) "
      note += "'שימוש בסמים בהזרקה או ב'הסנפה"
      note += "את/ה נשא/ית של דלקת כבד (הפטיטיס-'צהבת') מסוג B או C"
    }
    if (notForUse5 == true) {
      onChangeNFU(true)
      note += " , " + "שהייה מעל שנה בארץ בה שכיחות האיידס גבוהה וטרם עברו 12 חודשים מאז עזיבת האזור האנדמי או קיום יחסי מין בין גברים ב 12 החודשים האחרונים"
    }
    if (notForUse6 == true) {
      onChangeNFU(true)
      note += " , " + "קיימות סיבות אישיות או אחרות, שבגללן לא ניתן להשתמש במנת הדם שתתרום לעירוי לחולה"
    }

    if (note == "") {
      note = "לא קיימים סעיפים חריגים"
    }
    sendValidationForm(note);
  }

  const sendValidationForm = async (notes) => {
    try {
      let today = new Date();
      let result = await fetch(url + "api/add/valid_form", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: User.Personal_id,
          DateForm: today,
          Valid1: notForUse1,
          Valid2: notForUse2,
          Valid3: notForUse3,
          Valid4: notForUse4,
          Valid5: notForUse5,
          Valid6: notForUse6,
          Note: notes
        })
      })
      let rsponse = await result.json()
      if (rsponse == 'form send successfully') {
        console.log(rsponse);
        setModalInfo(true)
        setLoading(false)
        notes = ""
      }
      else {
        Alert.alert("בעיה בשליחת הפרטים לשרת, נסה/י מאוחר יותר")
        setLoading(false);
      }
    }
    catch (error) {
      console.log('error with the send data to server ')
    }
  }


  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם קיבלת טיפול בהורמון גדילה ממקור אנושי או עברת השתלת קרומי מח או קרנית, ממקור אנושי?</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={toggle1}
              value={notForUse1}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם במשפחתך הקרובה יש מחלת עצבים בשם: "קרויצפלד-יעקב" או נאמר לך שבמשפחתך קיים סיכון למחלה זו?</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={toggle2}
              value={notForUse2}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם שהיית בבריטניה בפרק זמן מצטבר של 6 חודשים בין השנים 1980 – 1996 או קיבלת עירוי דם</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Switch
              onValueChange={toggle3}
              value={notForUse3}
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
              onValueChange={toggle4}
              value={notForUse4}
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
              onValueChange={toggle5}
              value={notForUse5}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.text}>האם קיימות סיבות אישיות או אחרות, שבגללן לא ניתן להשתמש במנת הדם שתתרום לעירוי לחולה</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Text>לא לעירוי!</Text>
            <Switch
              onValueChange={toggle6}
              value={notForUse6}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => validationForm()}>
          <View style={styles.button_normal}>
            <Text style={styles.button_text} >סיום</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {loading && <Spiner loading={loading} />}
      {shouldShow && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={shouldShow}
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
                  setShouldShow(!shouldShow);
                }}>
                <Text style={styles.text} >סגור</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      )}
      {modalInfo && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalInfo}
            onRequestClose={() => { console.log('Modal has been closed.'); }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>פרטיך נקלטו בהצלחה במערכת,לנוחיותך הנך יכול\ה להוסיף תזכורת לפני מועד ההתרמה, בלחיצה על הכפתור "התורים שלך"</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalInfo(!modalInfo)
                    navigation.navigate('Home', { route: User })
                  }
                  }>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    navigation.navigate('Appointments', { route: User })
                  }
                  }>
                  <Text style={styles.textStyle}>התורים שלך</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
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
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
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
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});