import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Colors';
import ArrowLeft from '../../Assets/Img/arrow_left.svg';

const HeaderButtonReturn = ({ title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.black }}>
      <View
        style={{
          backgroundColor: Colors.black,
          paddingHorizontal: 22,
          alignItems: 'center',
          flexDirection: 'row',
          height: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#FFF" />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Poppins SemiBold',
            color: '#FFF',
            fontSize: 16,
            lineHeight: 20,
            marginLeft: 14,
          }}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HeaderButtonReturn;

