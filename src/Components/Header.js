import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Colors from '../Colors';

import { useNavigation } from '@react-navigation/native';
import Close from '../Assets/Img/close.svg';

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.black }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <View style={Styles.container}>
        <Text numberOfLines={1} style={Styles.title}>
          {title}
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => {
            navigation.navigate('Report', { screen: 'Index' });
          }}>
          <Close style={{ color: Colors.white, padding: 15 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Poppins SemiBold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

export default Header;

