import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import TimetableScreen from "./TimetableScreen";

import { FlatList } from "react-native-gesture-handler";

import firebase from "firebase";

import * as ScreenOrientation from 'expo-screen-orientation';
import * as Notifications from 'expo-notifications';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            timetable: [],
            timetable2: [],
            timetable3: [],
            timetable4: [],
            timetable5: [],
            timetable6: [],
            timetable7: []
        };
    }

    fetchTimetable = async() => {
        await firebase.firestore().collection("periods").doc("monday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable: timetable});
            this.props.setUpdateToFalse();
        });
        await firebase.firestore().collection("periods").doc("tuesday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable2: timetable});
            this.props.setUpdateToFalse();
        });
        await firebase.firestore().collection("periods").doc("wednesday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable3: timetable});
            this.props.setUpdateToFalse();
        });
        await firebase.firestore().collection("periods").doc("thursday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable4: timetable});
            this.props.setUpdateToFalse();
        });
        await firebase.firestore().collection("periods").doc("friday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable5: timetable});
            this.props.setUpdateToFalse();
        });
        await firebase.firestore().collection("periods").doc("saturday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable6: timetable});
            this.props.setUpdateToFalse();
        });
        await firebase.firestore().collection("periods").doc("sunday_" + firebase.auth().currentUser.uid).get().then((doc) => {
            let timetable = [];
            if(doc.exists){
                Object.keys("a").forEach(function (key){
                    timetable.push({
                        key: doc.id,
                        value: doc.data()
                    });
                });
            }
            this.setState({timetable7: timetable});
            this.props.setUpdateToFalse();
        });
        this.setState({test: [...this.state.timetable, ...this.state.timetable2, ...this.state.timetable3, ...this.state.timetable4, ...this.state.timetable5, ...this.state.timetable6, ...this.state.timetable7]});
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

    setup = async() => {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            //console.log(token);
        } else {
            token = null;
        }

        firebase.database().ref("/device_info/" + firebase.auth().currentUser.uid).set({
            push_token: token
        });
    }

    componentDidMount() {
        this.changeScreenOrientation();
        this.fetchUser();
        this.fetchTimetable();
        this.setup();
    }

    async changeScreenOrientation(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    renderItem = ({ item: timetable }) => {
        return <TimetableScreen timetable={timetable} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString();

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
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Timetable App</Text>
                    </View>
                </View>
                {!this.state.timetable[0] && !this.state.timetable2[0] && !this.state.timetable3[0]&& !this.state.timetable4[0]&& !this.state.timetable5[0]&& !this.state.timetable6[0]&& !this.state.timetable7[0] ? (
                    <View style = {styles.noTimetable}>
                        <Text style = {this.state.light_theme ? styles.noTimetableTextLight : styles.noTimetableText}>Timetable is not created. Please create Timetable to show Timetables.</Text>
                    </View>
                ) : (
                    <View style={styles.cardContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.test}
                            renderItem={this.renderItem}
                        />
                    </View>
                )}
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
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28)
    },
    cardContainer: {
        flex: 0.85
    },
    noTimetable: {
      flex: 0.85,
      justifyContent: "center",
    },
    noTimetableText: {
      fontSize: RFValue(40),
      color: "white"
    },
    noTimetableTextLight: {
      fontSize: RFValue(40),
      color: "black"
    }
});