import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Button,
    Alert
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import firebase from "firebase";

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: "monday",
            periods: 4,
            dropdownHeight: 40,
            light_theme: true,
            first_period: '',
            second_period: '',
            third_period: '',
            fourth_period: '',
            fifth_period: '',
            sixth_period: '',
            seventh_period: '',
            eighth_period: '',
            uid: ''
        };
    }

    componentDidMount() {
        this.fetchUser();
        this.readPeriods();
        this.testNotificationSendInTime();
    }

    async schedulePushNotification(day){
        await Notifications.scheduleNotificationAsync({
            content: {
              title: day + " Routine",
              body: "You just edited the " + day + " Routine",
              sound: "notification.mp3"
            },
            trigger: { seconds: 2 },
        });
    }

    testNotificationSendInTime = async() => {
        time = new Date().getTime();
        if(time === "18:30"){
            //Notifications.scheduleNotificationAsync()
        }
    }

    async addPeriods(){
        if(this.state.days === "monday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("monday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Monday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }else if(this.state.days === "tuesday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("tuesday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Tuesday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }else if(this.state.days === "wednesday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("wednesday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Wednesday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }else if(this.state.days === "thursday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("thursday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Thursday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }else if(this.state.days === "friday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("friday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Friday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }else if(this.state.days === "saturday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("saturday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Saturday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }else if(this.state.days === "sunday"){
            if(this.state.first_period && this.state.second_period && this.state.third_period && this.state.fourth_period){
                firebase.firestore().collection('periods').doc("sunday_" + firebase.auth().currentUser.uid).set({
                    first_period: this.state.first_period,
                    second_period: this.state.second_period,
                    third_period: this.state.third_period,
                    fourth_period: this.state.fourth_period,
                    fifth_period: this.state.fifth_period,
                    sixth_period: this.state.sixth_period,
                    seventh_period: this.state.seventh_period,
                    eighth_period: this.state.eighth_period,
                    uid: this.state.uid,
                    day: this.state.day
                });
                Alert.alert("Timetable App - INFO", "Thanks for using this App. Your Information is submitted.", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
                this.schedulePushNotification("Sunday");
            }else{
                Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
            }
        }
    }

    readPeriods = async() => {
        if(this.state.days === "monday"){
            await firebase.firestore().collection('periods').doc("monday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                console.log("testMonday" + doc.exists + doc.data());
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("monday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Monday'
                    });
                    firebase.firestore().collection('periods').doc("monday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
        if(this.state.days === "tuesday"){
            await firebase.firestore().collection('periods').doc("tuesday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("tuesday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Tuesday'
                    });
                    firebase.firestore().collection('periods').doc("tuesday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
        if(this.state.days === "wednesday"){
            await firebase.firestore().collection('periods').doc("wednesday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("wednesday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Wednesday'
                    });
                    firebase.firestore().collection('periods').doc("wednesday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
        if(this.state.days === "thursday"){
            await firebase.firestore().collection('periods').doc("thursday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("thursday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Thursday'
                    });
                    firebase.firestore().collection('periods').doc("thursday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
        if(this.state.days === "friday"){
            await firebase.firestore().collection('periods').doc("friday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("friday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Friday'
                    });
                    firebase.firestore().collection('periods').doc("friday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
        if(this.state.days === "saturday"){
            await firebase.firestore().collection('periods').doc("saturday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("saturday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Saturday'
                    });
                    firebase.firestore().collection('periods').doc("saturday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
        if(this.state.days === "sunday"){
            await firebase.firestore().collection('periods').doc("sunday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        first_period: doc.data().first_period,
                        second_period: doc.data().second_period,
                        third_period: doc.data().third_period,
                        fourth_period: doc.data().fourth_period,
                        fifth_period: doc.data().fifth_period,
                        sixth_period: doc.data().sixth_period,
                        seventh_period: doc.data().seventh_period,
                        eighth_period: doc.data().eighth_period,
                        uid: doc.data().uid,
                        day: doc.data().day
                    });
                }else{
                    firebase.firestore().collection('periods').doc("sunday_" + firebase.auth().currentUser.uid).set({
                        first_period: '',
                        second_period: '',
                        third_period: '',
                        fourth_period: '',
                        fifth_period: '',
                        sixth_period: '',
                        seventh_period: '',
                        eighth_period: '',
                        uid: firebase.auth().currentUser.uid,
                        day: 'Sunday'
                    });
                    firebase.firestore().collection('periods').doc("sunday_" + firebase.auth().currentUser.uid).get().then((doc) => {
                        this.setState({
                            first_period: doc.data().first_period,
                            second_period: doc.data().second_period,
                            third_period: doc.data().third_period,
                            fourth_period: doc.data().fourth_period,
                            fifth_period: doc.data().fifth_period,
                            sixth_period: doc.data().sixth_period,
                            seventh_period: doc.data().seventh_period,
                            eighth_period: doc.data().eighth_period,
                            uid: doc.data().uid,
                            day: doc.data().day
                        });
                    });
                }
            });
        }
    }

    fetchUser = () => {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme
                this.setState({ light_theme: theme === "light" })
            })
    }

    render() {
        return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>New / Edit Timetable</Text>
                    </View>
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                            <DropDownPicker
                                items={[
                                    { label: "Monday", value: "monday" },
                                    { label: "Tuesday", value: "tuesday" },
                                    { label: "Wednesday", value: "wednesday" },
                                    { label: "Thursday", value: "thursday" },
                                    { label: "Friday", value: "friday" },
                                    { label: "Saturday", value: "saturday" },
                                    { label: "Sunday", value: "sunday" }
                                ]}
                                defaultValue={this.state.days}
                                containerStyle={{
                                    height: 40,
                                    borderRadius: 20,
                                    marginBottom: 10
                                }}
                                onOpen={() => {
                                    this.setState({ dropdownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropdownHeight: 40 });
                                }}
                                style={{ backgroundColor: "transparent" }}
                                itemStyle={{
                                    justifyContent: "flex-start"
                                }}
                                dropDownStyle={{ backgroundColor: this.state.light_theme ? "#eee" : "#2a2a2a" }}
                                labelStyle={{
                                    color: this.state.light_theme ? "black" : "white"
                                }}
                                arrowStyle={{
                                    color: this.state.light_theme ? "black" : "white"
                                }}
                                onChangeItem={item => {
                                        this.setState({
                                            days: item.value
                                        });
                                        this.readPeriods();
                                    }
                                }
                            />
                        </View>

                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={first_period => this.setState({ first_period })}
                            placeholder={"1st Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.first_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={second_period => this.setState({ second_period })}
                            placeholder={"2nd Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.second_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={third_period => this.setState({ third_period })}
                            placeholder={"3rd Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.third_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={fourth_period => this.setState({ fourth_period })}
                            placeholder={"4th Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.fourth_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={fifth_period => this.setState({ fifth_period })}
                            placeholder={"5th Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.fifth_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={sixth_period => this.setState({ sixth_period })}
                            placeholder={"6th Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.sixth_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={seventh_period => this.setState({ seventh_period })}
                            placeholder={"7th Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.seventh_period}
                        />
                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={eighth_period => this.setState({ eighth_period })}
                            placeholder={"8th Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                            defaultValue={this.state.eighth_period}
                        />
                        <View style = {styles.submitButton}>
                            <Button onPress = {() => this.addPeriods()} title = "SUBMIT" color = "red"/>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.08 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28)
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
    },
    fieldsContainer: {
        flex: 0.85
    },
    inputFont: {
        marginTop: RFValue(10),
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white"
    },
    inputFontLight: {
        marginTop: RFValue(10),
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: "black"
    },
    submitButton: {
        marginTop: RFValue(20),
        alignItems: "center",
        justifyContent: "center"
    }
});