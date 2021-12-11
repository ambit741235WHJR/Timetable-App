//Importing React Module and other React Native with React Navigation Module
import * as React from 'react';
import { Animated } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AnimatedSplash from "react-native-animated-splash-screen";

//Importing Screens from Local
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";

//Importing Complete Firebase
import firebase from 'firebase';
import { firebaseConfig } from "./config";

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount(){
    setTimeout(() => this.setState({ isLoaded: true }), 1500);
  }

  render(){
    return (
      <AnimatedSplash translucent={true} isLoaded={this.state.isLoaded} logoImage={require("./assets/adaptive-icon.png")} backgroundColor={"#262626"}>
        <AppNavigator/>
      </AnimatedSplash>
    );
  }
}