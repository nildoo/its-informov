import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../../Colors';
import HeaderClose from '../../../../Components/Headers/HeaderClose';
import Badge from '../../../../Components/Badge';
import { AuthContext } from '../../../../Providers/Auth';
import Info from '../../../../Api/Info';

import NotificationItem from '../../../../Components/List/Notification';
import { useLanguage } from '../../../../hooks/useLanguage'

const Notification = () => {
  const { language } = useLanguage()
  const { user, setUser } = useContext(AuthContext)
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  async function refreshNotifications() {
    setLoadingNotifications(true)
    const refNotifications = await Info.getDefault(
      user.access_token,
      user.IDPRJ,
      'notifications',
    )

    setUser({
      ...user,
      info: {
        ...user.info,
        notifications: {
          chat: refNotifications.filter(x => {
            return x.link === 'Chat'
          }),
          pointsAttention: refNotifications.filter(x => {
            return x.link === 'PointsAttention'
          }),
          photos: refNotifications.filter(x => {
            return x.link === 'Photos'
          }),
          archives: refNotifications.filter(x => {
            return x.link === 'Archives'
          }),
        },
      },
    })
    setLoadingNotifications(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loadingNotifications}
            onRefresh={() => refreshNotifications()}
          />
        }>
        <View style={Styles.Container}>
          <HeaderClose
            title={language === 'portuguese' ? 'Notificações' : 'Notifications'}
          />
          <View style={Styles.HeaderNotification}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  marginRight: 4,
                  color: Colors.black,
                  fontFamily: 'Poppins SemiBold',
                  fontSize: 14,
                  lineHeight: 16,
                }}>
                {language === 'portuguese' ? 'Não lidas' : 'Unread'}
              </Text>
              <Badge
                backgroundColor={Colors.badge.danger}
                color={Colors.white}
                text="0"
              />
            </View>
          </View>
          <View>
            {loadingNotifications && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={Colors.blueLight} size={32} />
              </View>
            )}
            {user?.info?.notifications?.chat?.map((item, index) => (
              <NotificationItem key={index} notification={item} />
            ))}
            {user?.info?.notifications?.photos?.map((item, index) => (
              <NotificationItem key={index} notification={item} />
            ))}
            {user?.info?.notifications?.pointsAttention?.map((item, index) => (
              <NotificationItem key={index} notification={item} />
            ))}
            {user?.info?.notifications?.archives?.map((item, index) => (
              <NotificationItem key={index} notification={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  HeaderNotification: {
    paddingVertical: 20,
    paddingLeft: 16,
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Notification;

