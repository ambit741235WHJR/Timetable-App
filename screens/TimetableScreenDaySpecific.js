//Importing Basic React and Required React Native Modules
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

//Importing other React Native Modules
import { RFValue } from "react-native-responsive-fontsize";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

//Importing Expo Modules
import * as ScreenOrientation from 'expo-screen-orientation';

//Importing other Required Modules
import firebase from "firebase";

export default class TimetableScreenDaySpecific extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            HeadTable: ['1st Period', '2nd Period', '3rd Period', '4th Period', '5th Period', '6th Period', '7th Period', '8th Period'],
            DataTable: [
                []
            ]
        };
    }

    componentDidMount() {
        this.changeScreenOrientation();
        this.fetchUser();
        this.setup();
        setTimeout(() => this.setup2(), 1);
    }

    async changeScreenOrientation(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
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
                first_period: 'X',
                DataTable: [
                    ['X']
                ]
            });
        }else{
            this.setState({
                first_period: this.props.route.params.timetable.first_period,
                DataTable: [
                    [this.props.route.params.timetable.first_period]
                ]
            });
        }

        if(this.props.route.params.timetable.second_period === ''){
            this.setState({
                second_period: 'X',
                DataTable: [
                    [...this.state.DataTable, [this.state.first_period, 'X']]
                ]
            });
        }else if(this.props.route.params.timetable.second_period){
            this.setState({
                second_period: this.props.route.params.timetable.second_period,
                DataTable: [
                    [...this.state.DataTable, this.props.route.params.timetable.second_period]
                ]
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

    setup2 = async() => {
        this.setState({DataTable: [[this.state.first_period, this.state.second_period, this.state.third_period, this.state.fourth_period, this.state.fifth_period, this.state.sixth_period, this.state.seventh_period, this.state.eighth_period]]});
    }

    render() {
        if (!this.props.route.params) {
            this.props.navigation.navigate("Home");
        } else {
            return (
                <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <TouchableOpacity style={styles.appIcon} onPress={async() => {
                            this.props.navigation.navigate("Home");
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                        }}>
                            <Image
                                source={require("../assets/backButton.png")}
                                style={styles.iconImage}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timetableContainer}>
                        <ScrollView style={this.state.light_theme ? styles.timetableLight : styles.timetable}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
                            <Row data={this.state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText, {color: "#000"}}/>
                            <Rows data={this.state.DataTable} textStyle={this.state.light_theme ? {color: "#000", margin: 10} : {color: "#fff", margin: 10}}/>
                        </Table>
                            <View style={styles.periodsContainer}>
                                {/**
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
                                **/}
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
        width: "200%",
        height: "200%",
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
    },
    HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    HeadStyleLight: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    TableText: { 
        margin: 10
    }
});