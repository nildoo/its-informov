import React, { useContext, useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { AuthContext } from '../../../../Providers/Auth';
import DocumentsList from '../../../../Components/List/DocumentsList';
import Colors from '../../../../Colors';
import Download from '../../../../Components/Download';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Info from '../../../../Api/Info';
import { useLanguage } from '../../../../hooks/useLanguage';


const Archives = () => {
  const navigation = useNavigation();
  const [isDownload, setIsDownload] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const { language } = useLanguage();

  const [documents, setDocuments] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  const [urlSave, setUrlSave] = useState('');
  const [name, setName] = useState('');

  const [loadingDocuments, setLoadingDocuments] = useState(false);

  async function refreshDocuments() {
    setLoadingDocuments(true);
    const query = await Info.getDefault(
      user.access_token,
      user.IDPRJ,
      'documentos',
    );
    const apiDocuments = Object.entries(query);
    setUser({ ...user, info: { ...user.info, documents: query } });
    setDocuments(apiDocuments);
    setLoadingDocuments(false);
  }

  function HandleOpenMenu() {
    setIsOpenedMenu(true);
  }
  function HandleCloseMenu() {
    setIsOpenedMenu(false);
  }

  async function HandleDownloading() {
    setDownloadComplete(false);
    setIsDownload(true);

    setTimeout(() => {
      setIsDownload(false);
      setDownloadComplete(true);

      setTimeout(() => {
        setDownloadComplete(false);
      }, 500);
    }, 2000);
    //setIsDownload(false);
  }

  useEffect(() => {
    setDocuments(Object.entries(user.info.documents));
    async function removeNotification() {
      //Limpar notificações de documentos
      await Info.removeNotification(user.access_token, user.IDPRJ, 'archives');

      setUser({
        ...user,
        info: {
          ...user.info,
          notifications: {
            ...user.info.notifications,
            archives: [],
          },
        },
      });
    }
    removeNotification();
  }, []);

  function ViewOptionsButton({ url, name }) {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
          zIndex: 9999,
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,.5)',
        }}>
        <View style={{ backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={() => {
              setIsOpenedMenu(false);
              HandleCloseMenu();
              HandleDownloading();
              setTimeout(() => {
                navigation.navigate('PDFView', {
                  source: url,
                  name: name,
                });
              }, 2500);
            }}
            style={{
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                color: Colors.blueLight,
              }}>
              {language === 'portuguese' ? 'Salvar documento' : 'Save document'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              HandleCloseMenu();
              navigation.navigate('DocumentMessage', { url: url });
            }}
            style={{
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                color: Colors.blueLight,
              }}>
              {language === 'portuguese' ? 'Fazer comentário' : 'Comments'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandleCloseMenu()}
            style={{
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontFamily: 'Poppins Regular', color: Colors.infoText }}>
              {language === 'portuguese' ? 'Cancelar' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      {isOpenedMenu && <ViewOptionsButton url={urlSave} name={name} />}
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={loadingDocuments}
            onRefresh={() => refreshDocuments()}
          />
        }>
        {!loadingDocuments &&
          documents.map((item, index) => (
            <DocumentsList
              key={index}
              document={item}
              openMenu={HandleOpenMenu}
              handleDownload={HandleDownloading}
              setUrlSave={setUrlSave}
              setName={setName}
            />
          ))}
      </ScrollView>
      <View>{isDownload && <Download type="download" />}</View>
      <View>{downloadComplete && <Download />}</View>
    </View>
  );
};

export default Archives;
