import React from 'react';
import { View, Text } from 'react-native';

const Download = ({ type }) => {
  return (
    <>
      {type === 'download' ? (
        <View
          style={{
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#BEE6F7',
          }}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 14,
              color: '#166789',
              fontFamily: 'Poppins SemiBold',
              lineHeight: 16,
            }}>
            Baixando arquivo...
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#CDF1C8',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins SemiBold',
              lineHeight: 16,
              color: '#286927',
            }}>
            Download completo
          </Text>
        </View>
      )}
    </>
  );
};

export default Download;
