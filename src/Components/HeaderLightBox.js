import React, { createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Close from '../Assets/Img/close.svg';
import Colors from '../Colors';

const HeaderLightBox = ({ title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: 'gray' }}>
      <StatusBar barStyle="light-content" backgroundColor={'gray'} />
      <View style={Styles.Container}>
        <Text style={Styles.Title} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.navigate('Files')}>
          <Close style={{ color: Colors.white, padding: 15 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  Container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginRight:20,
    marginLeft:10,
    backgroundColor: 'gray',
  },
  Title: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    color: Colors.white,
  },
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
});

export default HeaderLightBox;

