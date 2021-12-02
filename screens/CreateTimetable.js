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

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: "monday",
            periods: 4,
            dropdownHeight: 40,
            light_theme: true
        };
    }

    componentDidMount() {
        this.fetchUser();
    }

    async addPost(){
        if(this.state.caption){
            let postData = {
                preview_image: this.state.previewImage,
                caption: this.state.caption,
                author: firebase.auth().currentUser.displayName,
                created_on: new Date(),
                author_uid: firebase.auth().currentUser.uid,
                likes: 0
            };
            await firebase.database().ref("/posts/" + Math.random().toString(36).slice(2)).set(postData).then(function (snapshot){});
            this.props.setUpdateToTrue();
            this.props.navigation.navigate("Feed");
        }else{
            Alert.alert("Error", "All Fields are required!!!", [{ text: "OK", onPress: () => console.log("OK Pressed") }], { cancelable: false });
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
                                onChangeItem={item =>
                                    this.setState({
                                        days: item.value
                                    })
                                }
                            />
                            <DropDownPicker
                                items={[
                                    { label: "4", value: 4 },
                                    { label: "5", value: 5 },
                                    { label: "6", value: 6 },
                                    { label: "7", value: 7 },
                                    { label: "8", value: 8 },
                                    { label: "9", value: 9 },
                                    { label: "10", value: 10 }
                                ]}
                                defaultValue={this.state.periods}
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
                                onChangeItem={item =>
                                    this.setState({
                                        periods: item.value
                                    })
                                }
                            />
                        </View>

                        <TextInput
                            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                            onChangeText={caption => this.setState({ caption })}
                            placeholder={"1st Period"}
                            placeholderTextColor={this.state.light_theme ? "black" : "white"}
                        />
                        <View style = {styles.submitButton}>
                            <Button onPress = {() => this.addPost()} title = "SUBMIT" color = "red"/>
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
        fontSize: 28,
        paddingLeft: 20
    },
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white"
    },
    inputFontLight: {
        marginTop: 30,
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