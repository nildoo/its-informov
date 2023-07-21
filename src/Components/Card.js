import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Colors from '../Colors';
import Badge from './Badge';

import { useNavigation } from '@react-navigation/native';

const Card = ({
  Icon,
  textBadge,
  colorIcon,
  text,
  backgroundBadge,
  colorBadge,
  route,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: '32%',
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        padding: 8,
      }}
      onPress={() => {
        if (route === 'Archives') {
          navigation.navigate('Files', { screen: route, initial: false });
        } else if (route === 'Chat') {
          navigation.navigate('Chat');
        } else {
          navigation.navigate('Report', { screen: route, initial: false });
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icon style={{ color: colorIcon }} />
        <Badge
          backgroundColor={backgroundBadge}
          text={textBadge}
          color={colorBadge}
        />
      </View>
      <Text
        style={{
          color: Colors.infoText,
          fontSize: 12,
          marginTop: 16,
          fontFamily: 'Poppins SemiBold',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
