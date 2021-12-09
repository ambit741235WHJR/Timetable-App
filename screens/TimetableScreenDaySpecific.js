import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";

export default class TimetableScreenDaySpecific extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }

    componentDidMount() {
        this.fetchUser();
        this.setup();
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

    setup = () => {
        if(this.props.route.params.timetable.first_period === ''){
            this.setState({
                first_period: 'X'
            });
        }else{
            this.setState({
                first_period: this.props.route.params.timetable.first_period
            });
        }

        if(this.props.route.params.timetable.second_period === ''){
            this.setState({
                second_period: 'X'
            });
        }else if(this.props.route.params.timetable.second_period){
            this.setState({
                second_period: this.props.route.params.timetable.second_period
            });
        }

        if(this.props.route.params.timetable.third_period === ''){
            this.setState({
                third_period: 'X'
            });
        }else{
            this.setState({
                third_period: this.props.route.params.timetable.third_period
            });
        }

        if(this.props.route.params.timetable.fourth_period === ''){
            this.setState({
                fourth_period: 'X'
            });
        }else{
            this.setState({
                fourth_period: this.props.route.params.timetable.fourth_period
            });
        }

        if(this.props.route.params.timetable.fifth_period === ''){
            this.setState({
                fifth_period: 'X'
            });
        }else{
            this.setState({
                fifth_period: this.props.route.params.timetable.fifth_period
            });
        }

        if(this.props.route.params.timetable.sixth_period === ''){
            this.setState({
                sixth_period: 'X'
            });
        }else{
            this.setState({
                sixth_period: this.props.route.params.timetable.sixth_period
            });
        }

        if(this.props.route.params.timetable.seventh_period === ''){
            this.setState({
                seventh_period: 'X'
            });
        }else{
            this.setState({
                seventh_period: this.props.route.params.timetable.seventh_period
            });
        }

        if(this.props.route.params.timetable.eighth_period === ''){
            this.setState({
                eighth_period: 'X'
            });
        }else{
            this.setState({
                eighth_period: this.props.route.params.timetable.eighth_period
            });
        }
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
                    <View style={styles.timetableContainer}>
                        <ScrollView style={this.state.light_theme ? styles.timetableLight : styles.timetable}>
                            <View style={styles.periodsContainer}>
                                <Text style={this.state.light_theme ? styles.periodsTextLight : styles.periodsText}>
                                    1st Period: {this.state.first_period}{"\n"}
                                    {"\n"}
                                    2nd Period: {this.state.second_period}{"\n"}
                                    {"\n"}
                                    3rd Period: {this.state.third_period}{"\n"}
                                    {"\n"}
                                    4th Period: {this.state.fourth_period}{"\n"}
                                    {"\n"}
                                    5th Period: {this.state.fifth_period}{"\n"}
                                    {"\n"}
                                    6th Period: {this.state.sixth_period}{"\n"}
                                    {"\n"}
                                    7th Period: {this.state.seventh_period}{"\n"}
                                    {"\n"}
                                    8th Period: {this.state.eighth_period}
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
    timetableContainer: {
        flex: 1
    },
    timetable: {
        margin: RFValue(20),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20)
    },
    timetableLight: {
        margin: RFValue(20),
        backgroundColor: "#eaeaea",
        borderRadius: RFValue(20)
    },
    periodsContainer: {
        padding: RFValue(10)
    },
    periodsText: {
        fontSize: 20,
        color: "white",
        paddingTop: RFValue(10)
    },
    periodsTextLight: {
        fontSize: 20,
        color: "black",
        paddingTop: RFValue(10)
    }
});