import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../../Colors';
import Badge from '../Badge';
import { useNavigation } from '@react-navigation/native';

const ItemListMore = ({
  text,
  isNotification,
  valueNotification,
  Icon,
  route,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={Styles.Container}
      onPress={() => navigation.navigate(route)}>
      <View style={Styles.Primary}>
        <Icon color={Colors.blueLight} />
        <Text style={Styles.Text}>{text}</Text>
      </View>
      {isNotification && valueNotification !== '0' && (
        <Badge
          backgroundColor={Colors.badge.danger}
          color={Colors.white}
          text={valueNotification}
        />
      )}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingRight: 32,
  },
  Primary: {
    flexDirection: 'row',
  },
  Text: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 14,
    color: Colors.black,
    marginLeft: 18,
  },
});

export default ItemListMore;
