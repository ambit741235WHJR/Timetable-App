import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AnimatedSplash from "react-native-animated-splash-screen";

import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";

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
      <AnimatedSplash translucent={true} isLoaded={this.state.isLoaded} logoImage={require("./assets/logo.png")} backgroundColor={"#262626"} logoHeight={150} logoWidth={150}>
        <AppNavigator/>
      </AnimatedSplash>
    );
  }
}