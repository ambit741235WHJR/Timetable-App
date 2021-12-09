import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateTimetable from "../screens/CreateTimetable";
import Feed from "../screens/Feed";
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props){
    super(props);
    this.state = {
      light_theme: true,
      isUpdated: false
    };
  }
  
  renderFeed = props => {
    return <Feed setUpdateToFalse = {this.removeUpdated}{...props}/>
  }

  renderPost = props => {
    return <CreateTimetable setUpdateToTrue = {this.changeUpdated}{...props}/>
  }

  changeUpdated = () => {
    this.setState({isUpdated: true});
  }

  removeUpdated = () => {
    this.setState({isUpdated: false});
  }

  componentDidMount(){
    let theme;
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", function(snapshot){
      theme = snapshot.val().current_theme;
    });
    this.setState({ light_theme: theme === "light" ? true : false });
  }

  render(){
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={
          this.state.light_theme
            ? styles.bottomTabStyleLight
            : styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Create Timetable') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icons} />;
          },
          //"tabBarActiveTintColor": "tomato",
          /*"tabBarActiveTintColor": "#ee8249",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]*/
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
        /*tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}*/
      >
        <Tab.Screen name="Feed" component={this.renderFeed} options={{unmountOnBlur: true}} />
        <Tab.Screen name="Create Timetable" component={this.renderPost} options={{unmountOnBlur: true}} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});