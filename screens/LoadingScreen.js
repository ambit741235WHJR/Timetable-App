import React, { Component } from 'react';
import { View, ActivityIndicator, Button, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default class LoadingScreen extends Component{
    async componentDidMount(){
        this.animation.play();
        setTimeout(async() => {
            this.checkIfLoggedIn();
        },2500);
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    }

    checkIfLoggedIn = async() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if(user) {
                checker_fingerprint = '';
                fingerprint_authentication_checker = await firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on('value', function(snapshot){
                    checker_fingerprint = snapshot.val().fingerprint_authentication_enabled;
                });
                if(checker_fingerprint === true){
                    if(await LocalAuthentication.hasHardwareAsync() === true){
                        await LocalAuthentication.authenticateAsync();
                    }else if(await LocalAuthentication.hasHardwareAsync() === false){
                        Alert.alert("ERROR!", "This device doesn't support Biometrics Authentication");
                    }
                }
                this.props.navigation.navigate('DashboardScreen');
            }else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
    }

    render(){
        return(
            <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large"/>
                <View style={styles.animationContainer}>
                    <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 400,
                        height: 400,
                        backgroundColor: 'white',
                    }}
                    source={require('../assets/loading.json')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonContainer: {
      paddingTop: 20,
    },
  });