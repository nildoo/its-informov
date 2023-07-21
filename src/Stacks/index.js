import React, { useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import SignIn from '../Screens/SignIn';
import Tab from '../Tabs';
import ImageMessage from '../Screens/ImageMessage';
import PDFView from '../Screens/PDFView';
import Chat from '../Screens/Chat';
import DocumentMessage from '../Screens/DocumentMessage';
import ChangePassword from '../Screens/ChangePassword';
import { AuthContext } from '../Providers/Auth';

const Login = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user.access_token ? (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
        </>
      ) : (
        <>
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="ImageMessage" component={ImageMessage} />
          <Stack.Screen name="PDFView" component={PDFView} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="DocumentMessage" component={DocumentMessage} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Login;
