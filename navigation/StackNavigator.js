import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './TabNavigation';
import TimetableScreenDaySpecific from '../screens/TimetableScreenDaySpecific';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName = "Home" screenOptions = {{
            headerShown: false
        }}>
            <Stack.Screen name = "Home" component = {BottomTabNavigator}/>
            <Stack.Screen name = "TimetableScreenDaySpecific" component = {TimetableScreenDaySpecific}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;