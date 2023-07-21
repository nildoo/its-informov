import React, { useEffect, useState, useContext } from 'react';
import CardAttention from '../../../../Components/CardAttention';

import { AuthContext } from '../../../../Providers/Auth';
import { ScrollView } from 'react-native';

import Header from '../../../../Components/Header';
import Info from '../../../../Api/Info';
import { useLanguage } from '../../../../hooks/useLanguage'

const PointsAttention = () => {
  const { language } = useLanguage()
  const { user, setUser } = useContext(AuthContext)
  const [points, setPoints] = useState([])

  useEffect(() => {
    async function removeNotification() {
      //Limpar notificações de pontos de atenção
      await Info.removeNotification(
        user.access_token,
        user.IDPRJ,
        'pointsattention',
      )

      setUser({
        ...user,
        info: {
          ...user.info,
          notifications: {
            ...user.info.notifications,
            pointsAttention: [],
          },
        },
      })
    }
    removeNotification()

    async function getPoints() {
      setPoints(user.info.attentionPoints)
    }
    getPoints()
  }, [])

  return (
    <>
      <Header
        title={
          language === 'portuguese'
            ? 'Pontos de atenção'
            : 'Points of attention'
        }
      />
      <ScrollView>
        {points.map((item, index) => (
          <CardAttention key={index} point={item} />
        ))}
      </ScrollView>
    </>
  )
}

export default PointsAttention;
