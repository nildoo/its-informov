import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Colors';
import File from '../../Assets/Img/file.svg';
import Badge from '../Badge';
import MenuDot from '../../Assets/Img/menu-dot.svg';
import { useNavigation } from '@react-navigation/native';

const DocumentsList = ({
  document,
  openMenu,
  handleDownload,
  setUrlSave,
  setName,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 12,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'Poppins SemiBold',
            fontSize: 14,
            lineHeight: 16,
            color: Colors.black,
            marginRight: 8,
          }}>
          {document[0]}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins SemiBold',
            fontSize: 12,
            lineHeight: 14,
            color: Colors.infoText,
          }}>
          Total: {document[1].length}
        </Text>
      </View>
      {document[1].map((item, index) => (
        <View
          key={index}
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <File color={Colors.blueLight} />
            <TouchableOpacity
              onPress={() => {
                handleDownload();

                setTimeout(() => {
                  navigation.navigate('PDFView', {
                    source: item.url,
                    name: item.arquivo,
                  });
                }, 2500);
              }}>
              <Text
                style={{
                  marginLeft: 12,
                  fontFamily: 'Poppins Regular',
                  fontSize: 12,
                  lineHeight: 14,
                  color: Colors.infoText,
                  maxWidth: '85%',
                }}>
                {item.arquivo}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              openMenu();
              setUrlSave(item.url);
              setName(item.arquivo);
            }}>
            <MenuDot color={Colors.infoText} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default DocumentsList;
