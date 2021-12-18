import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { url } from '../Utils';


export default function MedicalInfo({ navigation, route }) {
  console.log(route);
  const [donor, onChangeDonor] = useState(route.params.route);
  const [answerDate, setAnswerDate] = useState();
  const [q3_1, setQ3_1] = useState(false);
  const [q3_2, setQ3_2] = useState(false);
  const [q3_3, setQ3_3] = useState(false);
  const [q3_4, setQ3_4] = useState(false);
  const [q3_5, setQ3_5] = useState(false);
  const [q3_6, setQ3_6] = useState(false);
  const [q3_7, setQ3_7] = useState(false);
  const [q3_8, setQ3_8] = useState(false);
  const [q3_9, setQ3_9] = useState(false);
  const [q3_10, setQ3_10] = useState(false);
  const [q3_11, setQ3_11] = useState(false);
  const [q3_12, setQ3_12] = useState(false);
  const [q3_13, setQ3_13] = useState(false);
  const [q3_14, setQ3_14] = useState(false);
  const [q3_15, setQ3_15] = useState(false);
  const [q3_16, setQ3_16] = useState(false);
  const [q3_17, setQ3_17] = useState(false);
  const [q3_18, setQ3_18] = useState(false);
  const [q3_19, setQ3_19] = useState(false);
  const [q3_20, setQ3_20] = useState(false);
  const [q3_21, setQ3_21] = useState(false);
  const [notes, setNotes] = useState(null);

  var customDate = new Date(answerDate)
  var fDate = customDate.getDate() + '/' + (customDate.getMonth() + 1) + '/' + customDate.getFullYear()

  useEffect(() => {
    GetMedicalInfoDonor();
  }, [])

  const GetMedicalInfoDonor = async () => {
    try {
      let result = await fetch(url + "api/get/medical/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: route.params.route.Personal_id
        })
      });
      let medicalInfo = await result.json()
      console.log(medicalInfo);
      if (medicalInfo !== null || medicalInfo !== undefined) {
        setAnswerDate(medicalInfo.Answer_date);
        setQ3_1(medicalInfo.Q3_1)
        setQ3_2(medicalInfo.Q3_2)
        setQ3_3(medicalInfo.Q3_3)
        setQ3_4(medicalInfo.Q3_4)
        setQ3_5(medicalInfo.Q3_5)
        setQ3_6(medicalInfo.Q3_6)
        setQ3_7(medicalInfo.Q3_7)
        setQ3_8(medicalInfo.Q3_8)
        setQ3_9(medicalInfo.Q3_9)
        setQ3_10(medicalInfo.Q3_10)
        setQ3_11(medicalInfo.Q3_11)
        setQ3_12(medicalInfo.Q3_12)
        setQ3_13(medicalInfo.Q3_13)
        setQ3_14(medicalInfo.Q3_14)
        setQ3_15(medicalInfo.Q3_15)
        setQ3_16(medicalInfo.Q3_16)
        setQ3_17(medicalInfo.Q3_17)
        setQ3_18(medicalInfo.Q3_18)
        setQ3_19(medicalInfo.Q3_19)
        setQ3_20(medicalInfo.Q3_20)
        setQ3_21(medicalInfo.Q3_21)
        setNotes(medicalInfo.Notes)
      }
      else {
        Alert.alert("אין תור קיים בתאריך זה במערכת.")
        return
      }
    } catch (error) {
      console.log("אין תור פעיל בשרת");
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.infoBox}>
        <ScrollView >
          <Text style={styles.textStyle}>תאריך מילוי השאלון {fDate}</Text>
          <Text style={styles.textStyle}>{donor.First_name + " " + donor.Last_name} {donor.Personal_id}</Text>
          <Text style={styles.textStyle}>3.1 אני בריא וחש בטוב :  {q3_1 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.2 קיבל/ה עירוי דם/מרכבי דם ב- 6 החודשים האחרונים :  {q3_2 == true ? ("כן") : " לא"}</Text>
          <Text style={styles.textStyle}>3.3 נטלתי תרופות בחודש האחרון (כולל משככי כאבים, אספירין, ברזל וויטמינים) :  {q3_3 == true ? ("כן") : " לא"}</Text>
          <Text style={styles.textStyle}>3.4 קיבלתי חיסונים בחודש האחרון :  {q3_4 == true ? ("כן") : " לא"}</Text>
          <Text style={styles.textStyle}>3.5 עברתי טיפול שיניים נרחב ב- 7 הימים האחרונים :  {q3_5 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.6 קבלתי טיפול נגד זיבה ו/או עגבת ב- 12 החודשים האחרונים : {q3_6 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.8 גרתי במחיצת חולה בדלקת כבד חריפה (צהבת) ב- 6 החודשים האחרונים : {q3_7 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.9 חליתי בדלקת כבד (צהבת) :  {q3_8 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.9 חליתי בשחפת/ברוצלוזיס בשנתיים האחרונות :  {q3_9 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.10 עשיתי כתובת קעקע, בדיקה אנדוסקופית עם ביופסיה, דיקור סיני, איפור קבוע, עגיל בגוף, אפילציה או נידקרתי במחט מזרק משומשת ב- 6 החודשים החודשים האחרונים :  {q3_10 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.11 אני סובל/ת מהגדלת בלוטות, הזעת לילה, איבוד משקל, חום :  {q3_11 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.12 ביקרתי בחו''ל ב- 12 החודשים האחרונים:  {q3_12 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.13 גרתי מעל 6 חודשים בארץ נגועת מלריה או חליתי  במלריה ב - 3 השנים האחרונות :  {q3_13 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.14 סבלתי ממחלה רצינית בעבר כגון גידול ממאיר, נטייה לדמם וכו' :  {q3_14 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.15 אני חולה בסכרת, מחלת לב או אפילפסיה :  {q3_15 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.16 עברתי ניתוח כלשהו :  {q3_16 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.17 יש/היתה לי בעיה בריאותית אחרת (חריפה או כרונית) :  {q3_17 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.18 ננשכתי על ידי בעל חיים זר ב- 2 החודשים האחרונים :  {q3_18 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.19 ביקרתי בחו''ל ב- 28 הימים האחרונים :  {q3_19 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.20 לנשים: האם היית בהריון :  {q3_20 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.textStyle}>3.21 לנשים: האם היית בהריון מאז התרומה הקודמת :  {q3_21 == true ? ("כן") : "לא"}</Text>
          <Text style={styles.notes_title}>הערות פרטים רפואיים של התורם</Text>
          <Text style={styles.notes_data}>{notes}</Text>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  infoBox: {
    width: 390,
    height: 700,
    padding: 15,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'right',
  },
  notes_title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notes_data: {
    textAlign: 'center',
    fontSize: 20,
  }
})