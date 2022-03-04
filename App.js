//Importing React Module and other React Native with React Navigation Module
import * as React from 'react';
import { Alert } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AnimatedSplash from "react-native-animated-splash-screen";

//Importing Screens from Local
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";

//Importing Complete Firebase
import firebase from 'firebase';
import { firebaseConfig } from "./config";

//Importing Expo Modules
import * as Updates from 'expo-updates';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as LocalAuthentication from 'expo-local-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

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

  fetchUpdates = async() => {
    try{
      const update = await Updates.checkForUpdateAsync();
      if(update.isAvailable){
        Alert.alert("Timetable App", "A new Update is available\nUpdate Now?",[{
          text: "YES",
          onPress: async() => {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        },{
          text: "NO",
          onPress: () => console.log("Update Cancelled")
        }],{cancelable: false})
      }
    } catch(e){
      Alert.alert("Timetable App", "Error while fetching Updates.\nError:\n" + e.message)
    }
  }

  async registerForPushNotificationsAsync(){
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
        /*firebase.database().ref("/push_tokens/").set({
          token: token
        });*/
    } else {
        Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'Default Notifications',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        Notifications.setNotificationChannelAsync('announcements-info', {
            name: 'Announcements and info',
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        Notifications.setNotificationChannelAsync('updates', {
            name: "News regarding new Updates",
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
  }

  async changeScreenOrientation(){
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  async componentDidMount(){
    this.fetchUpdates();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    this.changeScreenOrientation();
    setTimeout(() => {
      this.setState({ isLoaded: true });
      this.registerForPushNotificationsAsync();
    }, 1500);
  }

  render(){
    return (
      <AnimatedSplash translucent={true} isLoaded={this.state.isLoaded} logoImage={require("./assets/adaptive-icon.png")} backgroundColor={"#262626"}>
        <AppNavigator/>
      </AnimatedSplash>
    );
  }
}