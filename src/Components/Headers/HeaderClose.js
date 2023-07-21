import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Close from '../../Assets/Img/close.svg';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Colors';

const HeaderClose = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={Styles.Header}>
      <Text style={Styles.Title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Close color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  Title: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});

export default HeaderClose;
