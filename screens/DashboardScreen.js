import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../navigation/DrawerNavigation';
import * as Linking from 'expo-linking';

const prefix = Linking.makeUrl('/');
const linking = {
  prefixes: [prefix]
}

export default function DashboardScreen() {
  return (
    <NavigationContainer linking={linking}>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}