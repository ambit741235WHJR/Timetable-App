import React, { Component } from 'react';
import { View, ActivityIndicator, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';

export default class LoadingScreen extends Component{
    componentDidMount(){
        this.animation.play();
        setTimeout(() => {
            this.checkIfLoggedIn();
        },2500);
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
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