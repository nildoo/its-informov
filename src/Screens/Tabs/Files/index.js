import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import Archives from './Archives';
import Photos from './Photos';
import { SafeAreaView } from 'react-native';
import { useLanguage } from '../../../hooks/useLanguage'
const Files = () => {
  const { language } = useLanguage()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: 'Poppins SemiBold',
          },
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: language === 'portuguese' ? 'Fotos' : 'Pictures',
          }}
          name="Photos"
          component={Photos}
        />
        <Tab.Screen
          options={{
            tabBarLabel: language === 'portuguese' ? 'Documentos' : 'Documents',
          }}
          name="Archives"
          component={Archives}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
};

export default Files;

