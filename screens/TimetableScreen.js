import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";

export default class TimetableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            timetable_id: this.props.timetable.key,
            timetable_data: this.props.timetable.value,
        }
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
            });
    }

    render() {
        let timetable = this.state.timetable_data;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("TimetableScreenDaySpecific", {
                timetable: timetable,
                timetable_id: this.state.timetable_id
            })}>
                <View style={this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
                    <Image source={require("../assets/timetable.png")} style={styles.timetableImage} />
                    <View style={styles.timetableDaysContainer}>
                        <Text style={this.state.light_theme ? styles.timetableDaysLight : styles.timetableDays}>
                            {timetable.day}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20),
        padding: RFValue(20)
    },
    cardContainerLight: {
        margin: RFValue(13),
        backgroundColor: "white",
        borderRadius: RFValue(20),
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: RFValue(0.5),
        shadowRadius: RFValue(5),
        elevation: RFValue(2),
        padding: RFValue(20)
    },
    timetableImage: {
        marginTop: RFValue(20),
        resizeMode: "contain",
        width: "100%",
        alignSelf: "center",
        height: RFValue(275)
    },
    timetableDaysContainer: {},
    timetableDays: {
        fontSize: 20,
        color: "white",
        paddingTop: RFValue(10)
    },
    timetableDaysLight: {
        fontSize: 20,
        color: "black",
        paddingTop: RFValue(10)
    }
});