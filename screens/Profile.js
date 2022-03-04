import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Switch,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import * as LocalAuthentication from 'expo-local-authentication';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      isEnabled2: false,
      light_theme: true,
      profile_image: '',
      name: '',
    };
  }

  toggleSwitch() {
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? 'dark' : 'light';
    var updates = {};
    updates['/users/' + firebase.auth().currentUser.uid + '/current_theme'] = theme;
    firebase.database().ref().update(updates);
    this.setState({
      isEnabled: !previous_state,
      light_theme: previous_state,
    });
  }

  async setupFingerprint(){
    const previous_state = this.state.isEnabled2;
    const fingerprint = !previous_state ? true : false;
    var updates = {};
    updates['/users/' + firebase.auth().currentUser.uid + '/fingerprint_authentication_enabled'] = fingerprint;
    firebase.database().ref().update(updates);
    this.setState({
      isEnabled2: fingerprint,
    });
    console.log(this.state.isEnabled2);
    if(fingerprint === true){
      const result = await LocalAuthentication.authenticateAsync();
      if(!result.success){
        Alert.alert("ERROR", "Fingerprint Authentication unsuccessful", [{ text: "OK", onPress: () => this.setState({ isEnabled2: false }) }], { cancelable: false })
      }
    }
  }

  fetchUsers = async() => {
    let theme, name, image, fingerprintEnabled;
    await firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
        fingerprintEnabled = snapshot.val().fingerprint_authentication_enabled;
    });
    this.setState({
      light_theme: theme === 'light' ? true : false,
      isEnabled: theme === 'light' ? false : true,
      isEnabled2: fingerprintEnabled ? true : false,
      name: name,
      profile_image: image,
    });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
        <View style={this.state.light_theme ? styles.containerLight : styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Timetable App</Text>
            </View>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.profile_image }}
                style={styles.profileImage}
              />
              <Text style={this.state.light_theme ? styles.nameTextLight : styles.nameText}>{this.state.name}</Text>
            </View>
            <View style={styles.themeContainer}>
              <Text style={this.state.light_theme ? styles.themeTextLight : styles.themeText}>Dark Theme</Text>
              <Switch
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                trackColor={{ false: '#767577', true: 'white' }}
                thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.toggleSwitch()}
                value={this.state.isEnabled}
              />
            </View>
            <View style={styles.themeContainer}>
              <Text style={this.state.light_theme ? styles.themeTextLight : styles.themeText}>Biometrics Authentication</Text>
              <Switch
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                trackColor={{ false: '#767577', true: 'white' }}
                thumbColor={this.state.isEnabled2 ? '#ee8249' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.setupFingerprint()}
                value={this.state.isEnabled2}
              />
            </View>
            <View style={{ flex: 0.3 }} />
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
  },
  screenContainer: { flex: 0.85 },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },
  nameText: {
    color: 'white',
    fontSize: RFValue(40),
    marginTop: RFValue(10),
  },
  nameTextLight: {
    color: 'black',
    fontSize: RFValue(40),
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(20),
  },
  themeText: {
    color: 'white',
    fontSize: RFValue(30),
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: 'black',
    fontSize: RFValue(30),
    marginRight: RFValue(15),
  }
});
