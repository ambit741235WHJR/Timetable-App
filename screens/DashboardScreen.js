import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../navigation/DrawerNavigation';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

const prefix = Linking.createURL('/');
const linking = {
  prefixes: ["https://android-deeplink-test-22b86.firebaseapp.com", prefix]
}

export default function DashboardScreen() {
  return (
    <NavigationContainer linking={linking}>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}