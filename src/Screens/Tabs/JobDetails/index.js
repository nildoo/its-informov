import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Styles from './styles';
import { AuthContext } from '../../../Providers/Auth';

import ArrowRight from '../../../Assets/Img/arrow_right.svg';
import Message from '../../../Assets/Img/message.svg';
import Warning from '../../../Assets/Img/warning.svg';
import Folder from '../../../Assets/Img/folder.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../../Colors';

import Badge from '../../../Components/Badge';
import Card from '../../../Components/Card';
import Info from '../../../Api/Info';
import { useLanguage } from '../../../hooks/useLanguage'

const JobDetails = () => {
  const { language } = useLanguage()
  const { user, setUser } = useContext(AuthContext)
  const navigation = useNavigation()

  const [projeto, setProjeto] = useState({})
  const [fotos, setFotos] = useState([])
  const [tamanhoPontosAtencao, setTamanhoPontosAtencao] = useState(0)
  const [tamanhoArquivos, setTamanhoArquivos] = useState(0)
  const [tamanhoPhotos, setTamanhoPhotos] = useState(0)
  const [tamanhoChat, setTamanhoChat] = useState(0)

  const [loading, setLoading] = useState(true)
  const [loadingPhotos, setLoadingPhotos] = useState(false)

  async function refreshFotos() {
    setLoadingPhotos(true)
    const query = await Info.getDefault(user.access_token, user.IDPRJ, 'fotos')
    const apiFotos = Object.entries(query)

    const photosList = []

    apiFotos.map(item => {
      item[1].map(photo => {
        photosList.push(photo)
      })
    })
    setUser({ ...user, info: { ...user.info, photos: query } })
    setFotos(photosList)
    setLoadingPhotos(false)

  }

  useEffect(() => {
    async function details() {
      const prj = user.info.details
      const apiFotos = Object.entries(user.info.photos)
      const pontos = user.info.attentionPoints

      setProjeto(prj)
      setTamanhoPontosAtencao(pontos.length)
      setTamanhoArquivos(user.info.notifications.archives[0].content.split(" "))
      setTamanhoPhotos(user.info.notifications.photos[0].content.split(" "))
      setTamanhoChat(user.info.notifications.chat[0].content.split(" "))

      const photosList = []

      apiFotos.map(item => {
        item[1].map(photo => {
          photosList.push(photo)
        })
      })
      setFotos(photosList)
      setLoading(false)
    }
    details()
  }, [])

  function getListImage(image, index) {
    if (index == 4) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Files')}
          style={{
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.white,
          }}>
          <ArrowRight />
          <Text
            style={{
              fontSize: 12,
              marginTop: -4,
              fontWeight: '500',
              color: Colors.blueLight,
              fontFamily: 'Poppins SemiBold',
            }}>
            Ver todas
          </Text>
        </TouchableOpacity>
      )
    } else if (index < 4) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ImageMessage', { photo: image })}>
          <Image
            source={{ uri: image.thumb }}
            style={{ width: 80, height: 80, marginRight: 12 }}
          />
        </TouchableOpacity>
      )
    }
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loadingPhotos}
          onRefresh={() => refreshFotos()}
        />
      }>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={Colors.blueLight} size={32} />
        </View>
      ) : (
        <ScrollView style={Styles.container}>
          <ImageBackground
            style={Styles.headerBackground}
            resizeMode="cover"
            source={{ uri: projeto.capa_thumb }}>
            <View style={Styles.headerSection}>
              <View
                style={{
                  height: 64,
                  width: 64,
                  borderRadius: 32,
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ height: 58, width: 58, borderRadius: 29 }}
                  resizeMode="cover"
                  source={{ uri: projeto.logo_thumb }}
                />
              </View>
              <View style={Styles.headerTitleSection}>
                <Text style={Styles.title}>{projeto.obra}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Badge
                  text={projeto.cliente}
                  color={Colors.black}
                  backgroundColor={Colors.badge.warning}
                />
              </View>
              <Text style={Styles.subTitle}>{projeto.endereco}</Text>
            </View>
          </ImageBackground>
          <View style={Styles.imagesSection}>
            <View style={Styles.imageSectionTitle}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={Styles.titleImageSection}>
                  {language === 'portuguese' ? 'Últimas fotos' : 'New pictures'}
                </Text>
                <Badge
                  text={
                    user.info.notifications.photos
                      ? tamanhoPhotos[2] + ''
                      : '0'
                  }
                  color={Colors.white}
                  backgroundColor={Colors.badge.danger}
                />
              </View>
            </View>
            {loadingPhotos ? (
              <View
                style={{
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={Colors.blueLight} size={32} />
              </View>
            ) : (
              <FlatList
                data={fotos}
                horizontal
                renderItem={({ item, index }) => getListImage(item, index)}
              />
            )}
          </View>
          <View style={Styles.CardsSection}>
            <Card
              Icon={Message}
              text={
                language === 'portuguese'
                  ? 'Mensagens no chat'
                  : 'Chat messages'
              }
              colorIcon={Colors.card.primary}
              backgroundBadge={Colors.card.primary}
              colorBadge={Colors.white}
              textBadge={
                user.info.notifications.chat
                  ? tamanhoChat[2] + ''
                  : '0'
              }
              route="Chat"
            />
            <Card
              Icon={Warning}
              colorIcon={Colors.card.danger}
              text={
                language === 'portuguese'
                  ? 'Pontos de atenção'
                  : 'Points of Attention'
              }
              backgroundBadge={Colors.card.danger}
              colorBadge={Colors.white}
              textBadge={
                user.info.notifications.pointsAttention
                  ? tamanhoPontosAtencao + ''
                  : '0'
              }
              route="PointsAttention"
            />
            <Card
              Icon={Folder}
              colorIcon={Colors.card.warning}
              text={
                language === 'portuguese' ? 'Novos documentos' : 'New Documents'
              }
              backgroundBadge={Colors.card.warning}
              colorBadge={Colors.black}
              textBadge={
                user.info.notifications.archives
                  ? tamanhoArquivos[2] + ''
                  : '0'
              }
              route="Archives"
            />
          </View>

          <View style={Styles.CardInfoSection}>
            <View style={Styles.Card}>
              <Text style={Styles.CardTitle}>
                {language === 'portuguese'
                  ? `Compromisso${'\n'}de entrega`
                  : 'Commitment'}
              </Text>
              <Text style={Styles.CardInfo}>{projeto.data_termino}</Text>
              <View>
                {projeto.status === 'Em andamento' && (
                  <Badge
                    backgroundColor={Colors.feedback.waitingBackground}
                    color={Colors.feedback.textWaiting}
                    text={
                      language === 'portuguese' ? 'Em andamento' : 'Ongoing'
                    }
                  />
                )}
                {projeto.status === 'Concluída' && (
                  <Badge
                    backgroundColor={Colors.feedback.successBackground}
                    color={Colors.feedback.textSuccess}
                    text={language === 'portuguese' ? 'Concluída' : 'Completed'}
                  />
                )}
                {projeto.status === 'Atrasada' && (
                  <Badge
                    backgroundColor={Colors.feedback.errorBackground}
                    color={Colors.feedback.textError}
                    text={language === 'portuguese' ? 'Atrasada' : 'Late'}
                  />
                )}
              </View>
            </View>
            <View style={Styles.Card}>
              {projeto.status === 'Atrasada' && (
                <Text style={Styles.CardTitle}>
                  {language === 'portuguese' ? `Atrasada a:${'\n'}` : 'Late'}
                </Text>
              )}
              {projeto.status === 'Em andamento' && (
                <Text style={Styles.CardTitle}>
                  {language === 'portuguese'
                    ? `Tempo${'\n'}restante`
                    : `Remaining${'\n'}days`}
                </Text>
              )}
              {projeto.status === 'Concluída' && (
                <Text style={Styles.CardTitle}>
                  {language === 'portuguese'
                    ? `Concluída a${'\n'}`
                    : `Completed in${'\n'}days`}
                </Text>
              )}
              <Text style={Styles.CardInfo}>
                {projeto.status_dias}{' '}
                {language === 'portuguese' ? `dias` : `days`}
              </Text>
              <Text style={Styles.CardInfo}></Text>
            </View>
          </View>

          <View style={Styles.Footer}>
            <Text style={Styles.TitleFooter}>
              {language === 'portuguese' ? 'Área da obra' : 'Project area'}
            </Text>
            <View style={Styles.FooterRight}>
              <Text style={Styles.TextFooterRight}>
                {projeto.area && projeto.area.split('m')[0]}
              </Text>
              <Text style={Styles.TextUnitFooter}>m2</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </ScrollView>
  )
}

export default JobDetails;

