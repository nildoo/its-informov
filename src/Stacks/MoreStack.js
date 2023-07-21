import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import More from '../Screens/Tabs/More/index';
import ChangeWork from '../Screens/Tabs/More/ChangeWork';
import Profile from '../Screens/Tabs/More/Profile';
import Notification from '../Screens/Tabs/More/Notification';

export default function MoreStack() {
  return (
    <Stack.Navigator
      initialRouteName="More"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen component={More} name="More" />
      <Stack.Screen component={ChangeWork} name="ChangeWork" />
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Screen component={Notification} name="Notification" />
    </Stack.Navigator>
  );
}
