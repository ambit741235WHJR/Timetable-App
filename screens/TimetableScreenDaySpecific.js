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
    TouchableOpacity
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";

export default class TimetableScreenDaySpecific extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
        };
    }

    componentDidMount() {
        this.fetchUser();
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
        if (!this.props.route.params) {
            this.props.navigation.navigate("Home");
        } else {
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
                    <View style={styles.postContainer}>
                        <ScrollView style={this.state.light_theme ? styles.postCardLight : styles.postCard}>
                            <Image source={require("../assets/timetable-monday-to-sunday.png")} style={styles.postImage} />
                            <View style={styles.captionContainer}>
                                <Text style={this.state.light_theme ? styles.captionTextLight : styles.captionText}>
                                    {this.props.route.params.timetable.first_period}{"\n"}
                                    {this.props.route.params.timetable.second_period}{"\n"}
                                    {this.props.route.params.timetable.third_period}{"\n"}
                                    {this.props.route.params.timetable.fourth_period}{"\n"}
                                    {this.props.route.params.timetable.fifth_period}{"\n"}
                                    {this.props.route.params.timetable.sixth_period}{"\n"}
                                    {this.props.route.params.timetable.seventh_period}{"\n"}
                                    {this.props.route.params.timetable.eighth_period}
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );
        }
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
    postContainer: {
        flex: 1
    },
    postCard: {
        margin: RFValue(20),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20)
    },
    postCardLight: {
        margin: RFValue(20),
        backgroundColor: "#eaeaea",
        borderRadius: RFValue(20)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    likeTextLight: {    
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    authorContainer: {
        height: RFPercentage(10),
        padding: RFValue(10),
        flexDirection: "row"
    },
    authorImageContainer: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: RFValue(100)
    },
    authorNameContainer: {
        flex: 0.85,
        padding: RFValue(10),
        justifyContent: "center"
    },
    authorNameText: {
        color: "white",
        fontSize: RFValue(20),
    },
    authorNameTextLight: {
        color: "black",
        fontSize: RFValue(20)
    },
    postImage: {
        width: "100%",
        alignSelf: "center",
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: "contain"
    },
    captionContainer: {
        padding: RFValue(10)
    },
    captionText: {
        fontSize: 20,
        color: "white",
        paddingTop: RFValue(10)
    },
    captionTextLight: {
        fontSize: 20,
        color: "black",
        paddingTop: RFValue(10)
    },
    likeButtonLiked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeButtonDisliked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#eb3948",
        borderWidth: 2,
        borderRadius: RFValue(30)
    }
});