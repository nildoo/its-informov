import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../Colors';

import { useNavigation } from '@react-navigation/native';

const CardReport = ({ route, color, text, Icon }) => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: '#000', width: '49%' }}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={Styles.container}
        onPress={() => navigation.navigate(route)}>
        <View style={[Styles.SectionIcon, { borderLeftColor: color }]}>
          <Icon style={{ color: color }} width={40} height={40} />
        </View>

        <Text style={Styles.Title}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  SectionIcon: {
    paddingLeft: 24,
    borderLeftWidth: 3,
  },
  Title: {
    fontSize: 14,
    paddingLeft: 24,
    paddingRight: 10,
    fontFamily: 'Poppins SemiBold',
    marginTop: 18,
    color: Colors.black,
  },
});

export default CardReport;
