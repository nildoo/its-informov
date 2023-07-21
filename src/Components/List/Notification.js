import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Colors';
import { useNavigation } from '@react-navigation/native';

const Notification = ({ notification }) => {
  const navigation = useNavigation();

  function HandleNotification() {
    if (notification.link === 'Photos') {
      navigation.navigate('Files', { screen: notification.link });
    } else if (notification.link === 'Arquives') {
      navigation.navigate('Files', { screen: notification.link });
    } else if (notification.link === 'Chat') {
      navigation.navigate('Chat');
    } else if (notification.link === 'PointsAttention') {
      navigation.navigate('Report', { screen: 'PointsAttention' });
    }
  }

  return (
    <TouchableOpacity
      onPress={() => HandleNotification()}
      style={{ padding: 16, backgroundColor: Colors.white }}>
      <Text
        style={{
          fontFamily: 'Poppins SemiBold',
          color: Colors.black,
          fontSize: 14,
        }}>
        {notification.content}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins SemiBold',
          color: Colors.infoText,
          fontSize: 12,
        }}>
        {notification.data}
      </Text>
    </TouchableOpacity>
  );
};

export default Notification;
