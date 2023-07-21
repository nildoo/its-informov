import React, { createContext } from 'react'

import Stack from './src/Stacks'

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/Providers/Auth';

import codePush from 'react-native-code-push';

import { initialCodePushOptions } from './src/Config/codePush';

import { LanguageProvider } from './src/context/setLanguage';

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default codePush(initialCodePushOptions)(App);
