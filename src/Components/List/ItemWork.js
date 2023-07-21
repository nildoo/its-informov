import React, { useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../Colors';
import { AuthContext } from '../../Providers/Auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

import ArrowRight from '../../Assets/Img/arrow_right.svg';

const ItemWork = ({ work }) => {
  const navigation = useNavigation();
  const { setUser, user } = useContext(AuthContext);

  async function ChangeWork() {
    await AsyncStorage.setItem('idprj', work.IDPRJ + '');
    setUser({ ...user, access_token: null });
  }

  return (
    <TouchableOpacity onPress={() => ChangeWork()}>
      <View
        style={{
          backgroundColor: Colors.white,
          paddingVertical: 12,
          marginBottom: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              borderColor: '#E5E5E5',
              borderWidth: 1,
            }}>
            <Image
              source={{
                uri: work.capa_thumb,
              }}
              resizeMode="cover"
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 8,
              }}
            />
          </View>
          <View style={{ marginLeft: 8, width: '80%' }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Poppins SemiBold',
                fontSize: 14,
                color: Colors.black,
                lineHeight: 16,
              }}>
              {work.cliente}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                fontSize: 12,
                color: Colors.infoText,
                lineHeight: 13,
              }}>
              {work.projeto}
            </Text>
          </View>
        </View>
        <ArrowRight color={Colors.blueLight} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemWork;
