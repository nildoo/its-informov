import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../Providers/Auth';

import { useNavigation } from '@react-navigation/native';

import Logo from '../../../Assets/Img/logo.png';
import BackgroundRight from '../../../Assets/Img/background_right.png';

import ArrowRight from '../../../Assets/Img/arrow_right.svg';
import Helmet from '../../../Assets/Img/helmet.svg';

import Bell from '../../../Assets/Img/bell.svg';
import Globe from '../../../Assets/Img/globe.svg';
import Message from '../../../Assets/Img/message.svg';
import User from '../../../Assets/Img/user.svg';

import Styles from './styles';
import Badge from '../../../Components/Badge';
import Colors from '../../../Colors';
import ItemListMore from '../../../Components/List/ItemListMore';
import { useLanguage } from '../../../hooks/useLanguage'

const More = () => {
  const { language } = useLanguage()
  const { setUser, user } = React.useContext(AuthContext)
  const navigation = useNavigation()
  const [totalNotifications, setTotalNotifications] = useState(0)

  useEffect(() => {
    var refTotal = 0
    if (user.info.notifications.chat) {
      refTotal = user.info.notifications.chat.length
    } else if (user.info.notifications.photos) {
      refTotal += user.info.notifications.photos.length
    } else if (user.info.notifications.pointsAttention) {
      refTotal += user.info.notifications.pointsAttention.length
    } else if (user.info.notifications.archives) {
      refTotal += user.info.notifications.archives.length
    }

    setTotalNotifications(refTotal)
  }, [user])

  async function logout() {
    setUser({
      access_token: null,
      IDPRJ: null,
      info: {
        documents: null,
        photos: null,
        email: null,
        details: {},
        attentionPoints: [],
        schedules: [],
        summarys: [],
        meeting: [],
        projects: [],
        notifications: {
          chat: [],
          pointsAttention: [],
          photos: [],
          archives: [],
        },
      },
    })
    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('idprj')
  }

  return (
    <ScrollView style={Styles.Container}>
      <View style={Styles.SectionHeader}>
        <Image source={Logo} style={Styles.Logo} />
        <Image source={BackgroundRight} />
      </View>
      <View style={Styles.Card}>
        <View style={Styles.CardPrimary}>
          <View style={Styles.SectionBadge}>
            <Badge
              backgroundColor={Colors.badge.warning}
              color={Colors.black}
              text={user.info.details.cliente}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 14,
              marginBottom: 8,
            }}>
            <Helmet color="#FFF" />
            <Text style={Styles.Title}>{user.info.details.obra}</Text>
          </View>
          <Text style={Styles.Local}>{user.info.details.endereco}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangeWork')}
          style={Styles.CardButton}
          activeOpacity={0.9}>
          <Text style={Styles.TextButton}>
            {language === 'portuguese' ? 'Alterar obra' : 'Change project'}
          </Text>
          <ArrowRight color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 56, marginTop: 24 }}>
        <ItemListMore
          route="Notification"
          text={language === 'portuguese' ? 'Notificações' : 'Notifications'}
          isNotification={true}
          valueNotification={totalNotifications + ''}
          Icon={Bell}
        />
        <ItemListMore
          route="Chat"
          text={language === 'portuguese' ? 'Chat' : 'Chat'}
          isNotification={true}
          valueNotification={
            user.info.notifications.chat
              ? user.info.notifications.chat.length + ''
              : '0'
          }
          Icon={Message}
        />
        <ItemListMore
          text={language === 'portuguese' ? 'Minha conta' : 'My account'}
          Icon={User}
          route="Profile"
        />
        {/*<ItemListMore text="English version" Icon={Globe} />*/}
      </View>

      <View style={Styles.SectionBtn}>
        <TouchableOpacity style={Styles.BtnSignOut} onPress={() => logout()}>
          <Text style={Styles.BtnText}>
            {language === 'portuguese' ? ' Sair' : 'Logoff'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default More;
