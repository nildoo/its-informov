import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../Colors';
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

const ItemProfile = ({ title, info, isClicked }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
      }}>
      <Text
        style={{
          fontFamily: 'Poppins Regular',
          fontSize: 13,
          lineHeight: 15,
          color: Colors.black,
        }}>
        {title}
      </Text>
      {isClicked ? (
        <TouchableOpacity
          onPress={() => {
            if (
              title === 'Política de privacidade' ||
              title === 'Privacy Policy'
            ) {
              Linking.openURL(
                'https://itsinformov.com.br/pt_br/politicadeprivacidade',
              )
            } else if (title === 'Compliance') {
              Linking.openURL('https://itsinformov.com.br/pt_br/compliance/')
            } else if (title === 'Senha' || title === 'Password') {
              navigation.navigate('ChangePassword')
            }
          }}>
          <Text
            style={{
              fontFamily: 'Poppins SemiBold',
              fontSize: 14,
              lineHeight: 16,
              color: Colors.blueLight,
            }}>
            {info}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            fontFamily: 'Poppins SemiBold',
            fontSize: 13,
            lineHeight: 15,
            color: Colors.black,
          }}>
          {info}
        </Text>
      )}
    </View>
  );
};

export default ItemProfile;
