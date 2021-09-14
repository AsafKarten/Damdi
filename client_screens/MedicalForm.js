import React, { useState } from 'react';

import { View, ScrollView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Button, CheckBox } from 'react-native';


const url = "http://proj13.ruppin-tech.co.il/"

export default function MedicalForm({ navigation, route }) {
    const [Q3_1, onChangeQ3_1] = useState(false)
    const [Q3_2, onChangeQ3_2] = useState(false)
    const [Q3_3, onChangeQ3_3] = useState(false)
    const [Q3_4, onChangeQ3_4] = useState(false)
    const [Q3_5, onChangeQ3_5] = useState(false)
    const [Q3_6, onChangeQ3_6] = useState(false)
    const [Q3_7, onChangeQ3_7] = useState(false)
    const [Q3_8, onChangeQ3_8] = useState(false)
    const [Q3_9, onChangeQ3_9] = useState(false)
    const [Q3_10, onChangeQ3_10] = useState(false)
    const [Q3_11, onChangeQ3_11] = useState(false)
    const [Q3_12, onChangeQ3_12] = useState(false)
    const [Q3_13, onChangeQ3_13] = useState(false)
    const [Q3_14, onChangeQ3_14] = useState(false)
    const [Q3_15, onChangeQ3_15] = useState(false)
    const [Q3_16, onChangeQ3_16] = useState(false)
    const [Q3_17, onChangeQ3_17] = useState(false)
    const [Q3_18, onChangeQ3_18] = useState(false)
    const [Q3_19, onChangeQ3_19] = useState(false)
    const [Q3_20, onChangeQ3_20] = useState(false)
    const [Q3_21, onChangeQ3_21] = useState(false)
    const [notes, onChangeNotes] = useState()

    //חלק ג של השאלון בשרת זה MedicalInfoDonation
    return (
        
            <ScrollView >
               
                <View style={styles.HorizontalBox}>
                    <Text>אני בריא/ה וחש בטוב היום</Text>
                    <CheckBox
                        value={Q3_1}
                        onValueChange={onChangeQ3_1}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>קיבלתי עירוי דם/מרכבי דם ב- 6 החודשים האחרונים</Text>
                    <CheckBox
                        value={Q3_2}
                        onValueChange={onChangeQ3_2}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>נטלתי תרופות בחודש האחרון (כולל משככי כאבים, אספירין, ברזל וויטמינים).  פרט/י</Text>
                    <CheckBox
                        value={Q3_3}
                        onValueChange={onChangeQ3_3}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>קיבלתי חיסונים בחודש האחרון.
                        פרט/י.
                    </Text>
                    <CheckBox
                        value={Q3_4}
                        onValueChange={onChangeQ3_4}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>עברתי טיפול שיניים נרחב ב- 7 הימים האחרונים</Text>
                    <CheckBox
                        value={Q3_5}
                        onValueChange={onChangeQ3_5}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>קיבלתי טיפול נגד זיבה ו/או עגבת ב- 12 החודשים האחרונים</Text>
                    <CheckBox
                        value={Q3_6}
                        onValueChange={onChangeQ3_6}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>גרתי במחיצת חולה בדלקת כבד חריפה (צהבת) ב- 6 החודשים האחרונים</Text>
                    <CheckBox
                        value={Q3_7}
                        onValueChange={onChangeQ3_7}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>חליתי בדלקת כבד (צהבת).
                        פרט/י איזה
                    </Text>
                    <CheckBox
                        value={Q3_8}
                        onValueChange={onChangeQ3_8}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>חליתי בשחפת/ברוצלוזיס בשנתיים האחרונות</Text>
                    <CheckBox
                        value={Q3_9}
                        onValueChange={onChangeQ3_9}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>עשיתי כתובת קעקע, בדיקה אנדוסקופית עם ביופסיה, דיקור סיני, איפור קבוע, עגיל בגוף, אפילציה או נדקרתי במחט מזרק משומשת ב- 6 החודשים האחרונים</Text>
                    <CheckBox
                        value={Q3_10}
                        onValueChange={onChangeQ3_10}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>אני סובל/ת מהגדלת בלוטות, הזעת לילה, איבוד משקל, חום.</Text>
                    <CheckBox
                        value={Q3_11}
                        onValueChange={onChangeQ3_11}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>ביקרתי בחו"ל ב- 12 החודשים האחרונים פרט באילו ארצות.
                    </Text>
                    <CheckBox
                        value={Q3_12}
                        onValueChange={onChangeQ3_12}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>גרתי מעל 6 חודשים בארץ נגועת מלריה או חליתי במלריה ב- 3 השנים האחרונות.</Text>
                    <CheckBox
                        value={Q3_13}
                        onValueChange={onChangeQ3_13}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>סבלתי ממחלה רצינית בעבר כגון גידול ממאיר, נטייה לדמם וכו'.</Text>
                    <CheckBox
                        value={Q3_14}
                        onValueChange={onChangeQ3_14}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>אני חולה בסכרת, מחלת לב או אפילפסיה.</Text>
                    <CheckBox
                        value={Q3_15}
                        onValueChange={onChangeQ3_15}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>עברתי ניתוח כלשהו
                        פרט/י
                    </Text>
                    <CheckBox
                        value={Q3_16}
                        onValueChange={onChangeQ3_16}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>יש/ הייתה לי בעיה בריאותית אחרת (חריפה או כרונית)
                        פרט/י
                    </Text>
                    <CheckBox
                        value={Q3_17}
                        onValueChange={onChangeQ3_17}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>ננשכתי על ידי בע"ח זר ב- 2 החודשים האחרונים.</Text>
                    <CheckBox
                        value={Q3_18}
                        onValueChange={onChangeQ3_18}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>ביקרתי בחו"ל ב- 28 הימים האחרונים
                        פרט/י באילו ארצות
                    </Text>
                    <CheckBox
                        value={Q3_19}
                        onValueChange={onChangeQ3_19}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>לנשים: האם את בהריון?</Text>
                    <CheckBox
                        value={Q3_20}
                        onValueChange={onChangeQ3_20}
                        style={styles.checkbox}
                    />
                </View>
                <View style={styles.HorizontalBox}>
                    <Text>לנשים: האם היית בהריון מאז התרומה הקודמת?</Text>
                    <CheckBox
                        value={Q3_21}
                        onValueChange={onChangeQ3_21}
                        style={styles.checkbox}
                    />
                </View>

            
       
        </ScrollView>
      
    ); 

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questuonBox: {

    },
    checkbox: {
        alignSelf: "center",
        marginRight: 2,
        marginLeft:50,
    },
    HorizontalBox: {
        width: 300,
        flexDirection: 'row-reverse',
        marginTop: 22,
        borderBottomColor: 'grey',
        marginRight:-30,
    },
});