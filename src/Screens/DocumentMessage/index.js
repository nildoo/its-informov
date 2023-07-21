import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import HeaderClose from '../../Components/Headers/HeaderClose';

import File from '../../Assets/Img/file.svg';
import Colors from '../../Colors';
import { AuthContext } from '../../Providers/Auth';
import { useNavigation } from '@react-navigation/native';

import Info from '../../Api/Info';

const DocumentMessage = ({ route }) => {
  const url = route.params.url;
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  async function HandleSendMessage() {
    await Info.sendMessage(user.access_token, user.IDPRJ, message, url);
    setMessage('');
    navigation.navigate('Chat');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderClose title={'Documentos'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled={Platform.OS === 'ios'}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E5E5E5',
            }}>
            <File color={Colors.blueLight} />
          </View>
          <Text>{url}</Text>
        </View>
        <View
          style={{
            paddingVertical: 8,
            backgroundColor: Colors.white,
            paddingHorizontal: 16,
            minHeight: 56,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 12,
              flex: 1,
              justifyContent: 'space-between',
              borderRadius: 2,
              borderColor: '#BEBEBE',
              borderWidth: 1,
            }}>
            <TextInput
              multiline
              style={{ flex: 1, color: Colors.infoText }}
              placeholder="Enviar mensagem"
              placeholderTextColor={Colors.infoText}
              value={message}
              onChangeText={text => setMessage(text)}
            />
            <TouchableOpacity
              style={{ justifyContent: 'center', paddingHorizontal: 8 }}
              disabled={message === ''}
              onPress={() => HandleSendMessage()}>
              <Text
                style={{
                  fontFamily: 'Poppins SemiBold',
                  fontSize: 14,
                  lineHeight: 18,
                  color: message === '' ? '#BEBEBE' : Colors.blueLight,
                }}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DocumentMessage;

