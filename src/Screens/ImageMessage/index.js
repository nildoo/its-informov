import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Info from '../../Api/Info';
import Styles from './styles';
import HeaderLightBox from '../../Components/HeaderLightBox';
import Message from '../../Assets/Img/message.svg';
import ArrowRight from '../../Assets/Img/arrow_right.svg';
import Colors from '../../Colors';
import { AuthContext } from '../../Providers/Auth';
import { useLanguage } from '../../hooks/useLanguage';

const ImageMessage = ({ route }) => {
  const navigation = useNavigation();
  const photo = route.params.photo;
  const [message, setMessage] = useState('');
  const { language } = useLanguage();

  const [loadingImage, setLoadingImage] = useState(true);

  const { user } = useContext(AuthContext);

  const images = [];

  Object.entries(user.info.photos).map(item => {
    item[1].map(call => {
      images.push({ url: call.url });
    });
  });

  const numberPhoto = images.findIndex(item => {
    return item.url == photo.url;
  });

  const [urlImageMessage, setUrlImageMessage] = useState(photo.url);

  async function HandleSendMessage() {
    await Info.sendMessage(
      user.access_token,
      user.IDPRJ,
      message,
      urlImageMessage,
    );
    navigation.navigate('Chat');
  }

  const [keyboardOpened, setKeyboardOpened] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setMessage('');
      setKeyboardOpened(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setMessage('');
      setKeyboardOpened(false);
    });
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, [keyboardOpened]);

  return (
    <ImageBackground style={Styles.Container}>
      <HeaderLightBox title={photo.arquivo} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled={Platform.OS === 'ios'}>
        {/*loadingImage && <ActivityIndicator size={24} color={Colors.blueLight} />*/}
        <ImageViewer
          imageUrls={images}
          enablePreload
          index={numberPhoto}
          renderImage={props => <Image {...props} />}
          onChange={index => {
            setUrlImageMessage(images[index].url);
          }}
        />

        <View>
          <View style={Styles.Footer}>
            <View style={keyboardOpened && Styles.SectionFooterKeyboardOpened}>
              <View style={Styles.FooterRight}>
                {!keyboardOpened && <Message color={Colors.white} />}
                <TextInput
                  onChangeText={value => setMessage(value)}
                  multiline
                  value={message}
                  style={Styles.TextMessage}
                  placeholder={language === 'portuguese' ? 'Enviar mensagem' : 'Send message'}
                  placeholderTextColor={
                    keyboardOpened ? Colors.infoText : Colors.white
                  }
                />
              </View>
              {keyboardOpened && (
                <TouchableOpacity
                  onPress={() => HandleSendMessage()}
                  disabled={message == ''}
                  style={{
                    paddingRight: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: message == '' ? '#BEBEBE' : Colors.blueLight,
                      fontFamily: 'Poppins SemiBold',
                    }}>
                    {language === 'portuguese' ? 'Enviar' : 'Send'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {!keyboardOpened && <ArrowRight style={{ color: Colors.white }} />}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ImageMessage;

