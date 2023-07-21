import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Report from '../Screens/Tabs/Report';
import PointsAttention from '../Screens/Tabs/Report/PointsAttention';
import Schedule from '../Screens/Tabs/Report/Schedule';
import Summary from '../Screens/Tabs/Report/Summary';
import Meeting from '../Screens/Tabs/Report/Meeting';

const Reports = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Index' component={Report}/>
            <Stack.Screen name='PointsAttention' component={PointsAttention}/>
            <Stack.Screen name='Summary' component={Summary}/>
            <Stack.Screen name='Schedule' component={Schedule} />
            <Stack.Screen name='Meeting' component={Meeting} />
        </Stack.Navigator>
    );
}

export default Reports;