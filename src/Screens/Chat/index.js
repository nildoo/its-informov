import React, { useState, useContext, useEffect, createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../../Colors';
import { AuthContext } from '../../Providers/Auth';
import Info from '../../Api/Info';
import HeaderClose from '../../Components/Headers/HeaderClose';
import ImageViewer from 'react-native-image-zoom-viewer';
import Close from '../../Assets/Img/close';
import { useLanguage } from '../../hooks/useLanguage';

const Chat = () => {

  const { language } = useLanguage();
  const { user, setUser } = useContext(AuthContext);
  const refFlat = createRef();
  const [imageView, setImageView] = useState(null);
  const [message, setMessage] = useState('');
  const [listMessages, setListMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function removeNotification() {
      //Limpar notificações do chat
      await Info.removeNotification(user.access_token, user.IDPRJ, 'chat');

      setUser({
        ...user,
        info: {
          ...user.info,
          notifications: {
            ...user.info.notifications,
            chat: [],
          },
        },
      });
    }
    removeNotification();
  }, []);

  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      const token = user.access_token;
      const idprj = user.IDPRJ;

      //console.log(user.info)

      var mensagensPage = [];
      var refsMessages = [];

      mensagensPage = await Info.getMessages(token, idprj, 1);
      //Pegar últimas mensagens
      refsMessages = await Info.getMessages(
        token,
        idprj,
        mensagensPage.last_page,
      );

      setListMessages(refsMessages.data);
      setLoading(false);
    }
    getMessages();
  }, []);

  function LoadingMoreMessages() {}

  async function HandleSendMessage() {
    const token = user.access_token;
    const idprj = user.IDPRJ;

    const send = await Info.sendMessage(token, idprj, message, null);
    setMessage('');

    setListMessages([...listMessages, send]);
  }

  function HandleImage() {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: 'rgba(0,0,0,.9)',
          left: 0,
          top: 0,
          position: 'absolute',
          width: '100%',
          zIndex: 999,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ height: '90%', width: '100%' }}>
          <TouchableOpacity
            onPress={() => setImageView(null)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Close color={Colors.white} />
          </TouchableOpacity>
          <ImageViewer
            backgroundColor="rgba(0,0,0,0)"
            imageUrls={[{ url: imageView }]}
            renderIndicator={() => null}
            renderImage={props => <Image {...props} />}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={Styles.Container}>
      {imageView && <HandleImage />}
      <HeaderClose title="Chat - Its Informov" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled={Platform.OS === 'ios'}>
        <View style={Styles.Main}>
          {loading && (
            <View
              style={{
                padding: 8,
                alignItems: 'center',
                width: '100%',
                zIndex: 999,
                position: 'absolute',
              }}>
              <ActivityIndicator color={Colors.black} size={32} />
            </View>
          )}

          <FlatList
              ref={refFlat}
            contentContainerStyle={{
              justifyContent: 'flex-end',
              flexGrow: 1,
              padding: 16,
            }}
            data={listMessages}
            renderItem={({ item }) => (
              <MessageChat
                allMessages={listMessages}
                message={item}
                onViewImage={setImageView}
              />
            )}
            keyExtractor={(index) => index.toString()}
            onContentSizeChange={() =>
              !loading && refFlat.current.scrollToEnd()
            }
          />

          <View style={Styles.Form}>
            <View style={Styles.BoxForm}>
              <TextInput
                multiline
                style={{ flex: 1, color: Colors.infoText }}
                placeholder={language === 'portuguese' ? 'Enviar mensagem' : 'Send message'}
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
                  {language === 'portuguese' ? 'Enviar' : 'Send'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Main: {
    flex: 1,
  },
  Form: {
    paddingVertical: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  BoxForm: {
    flexDirection: 'row',
    paddingLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 2,
    borderColor: '#BEBEBE',
    borderWidth: 1,
  },
});

export default Chat;

