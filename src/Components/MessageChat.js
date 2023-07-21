import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../Colors';
import File from '../Assets/Img/file.svg';

import { useNavigation } from '@react-navigation/native';

const MessageChat = ({ message, allMessages, onViewImage }) => {
  const navigation = useNavigation();

  return (
    <>
      {(index === 0 ||
        (index < allMessages.length &&
          allMessages[index - 1].data.split(' ')[0] !==
            message.data.split(' ')[0])) && (
        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              color: Colors.infoText,
              fontFamily: 'Poppins Medium',
              fontSize: 10,
            }}>
            {message.data.split(' ')[0]}
          </Text>
        </View>
      )}

      {(message.anexo_ext === 'png' ||
        message.anexo_ext === 'PNG' ||
        message.anexo_ext === 'jpg' ||
        message.anexo_ext === 'JPG' ||
        message.anexo_ext === 'jpeg' ||
        message.anexo_ext === 'JPEG') && (
        <View
          style={{
            alignSelf:
              message.tipo === 'comentario' ? 'flex-end' : 'flex-start',
            marginBottom: 8,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onViewImage(message.anexo_url)}>
            <Image
              source={{ uri: message.anexo_url }}
              style={{
                width: 104,
                height: 104,
                borderRadius: 12,
                borderWidth: 4,
                borderColor:
                  message.tipo === 'comentario' ? Colors.blueLight : '#777',
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {message.anexo_ext === 'pdf' && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PDFView', {
              source: message.anexo_url,
              name: message.anexo_url,
            })
          }>
          <View
            style={{
              height: 48,
              alignItems: 'center',
              padding: 8,
              backgroundColor: Colors.white,
              flexDirection: 'row',
              marginBottom: 8,
              borderRadius: 8,
            }}>
            <View
              style={{
                height: 32,
                width: 32,
                backgroundColor: '#E5E5E5',
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <File color={Colors.blueLight} />
            </View>
            <Text
              numberOfLines={1}
              style={{
                marginLeft: 4,
                width: 250,
                fontFamily: 'Poppins Regular',
                fontSize: 12,
                color: Colors.infoText,
              }}>
              {message.anexo_url}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginLeft: message.tipo === 'comentario' ? 40 : 0,
          marginRight: message.tipo === 'resposta' ? 40 : 0,
          backgroundColor:
            message.tipo === 'comentario' ? Colors.blueLight : '#777',
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins Medium',
            fontSize: 14,
            lineHeight: 18,
            color: Colors.white,
          }}>
          {message.resposta}
        </Text>
      </View>
      <View>
        <Text
          style={{
            width: '100%',
            textAlign: message.tipo === 'comentario' ? 'right' : 'left',
            fontFamily: 'Poppins Regular',
            fontSize: 10,
            lineHeight: 12,
            color: Colors.infoText,
            marginBottom: 8,
            marginTop: 4,
          }}>
          {message.data.split(' ')[1]}
        </Text>
      </View>
    </>
  );
};

export default MessageChat;
