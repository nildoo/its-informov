import React from 'react';

import { View, Text } from 'react-native';
import Colors from '../../Colors';

import Badge from '../Badge';

const ListInfo = ({ info, type, index }) => {
  return (
    <>
      {info.status && index === 0 && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f6f6f6',
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          <Badge
            text={info.status}
            color={Colors.feedback.textWarning}
            backgroundColor={Colors.feedback.warningBackground}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#f6f6f6',
          paddingTop: 12,
          paddingBottom: 16,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          marginBottom: 2,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: Colors.black,
            fontFamily: 'Poppins Regular',
            maxWidth: '60%',
          }}>
          {info.descricao}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'Poppins SemiBold',
            color: Colors.black,
          }}>
          {type === 'money' && 'R$'} {info.valor} {type === 'percent' && '%'}
        </Text>
      </View>
    </>
  );
};

export default ListInfo;
