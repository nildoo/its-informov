import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';

import PercentageCircle from 'react-native-progress-circle';
import Styles from './styles';

import Header from '../../../../Components/Header';
import ListInfo from '../../../../Components/List/ListInfo';
import { AuthContext } from '../../../../Providers/Auth';
import { useLanguage } from '../../../../hooks/useLanguage'

const Schedule = () => {
  const { language } = useLanguage()
  const { user } = useContext(AuthContext)
  const [schedules, setSchedules] = useState([])
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    async function getSchedules() {
      const schedulesItems = []

      var totalPercent = 0.0
      await user.info.schedules.map(item => {
        schedulesItems.push({
          descricao: item.descricao,
          valor: item.porcentagem,
        })
        totalPercent += parseFloat(item.porcentagem.replace(',', '.'))
      })

      setSchedules(schedulesItems)
      setPercent((totalPercent / schedulesItems.length).toFixed(2))
    }
    getSchedules()
  }, [])

  return (
    <View style={Styles.container}>
      <Header
        title={language === 'portuguese' ? 'Cronograma' : 'Time Schedule'}
      />
      <View style={Styles.SectionHeader}>
        <View style={Styles.SectionPercent}>
          <PercentageCircle
            radius={84}
            percent={parseFloat(percent)}
            shadowColor="#1D4A17"
            color="#A2E29B"
            bgColor="#1D4A17"
            borderWidth={6}
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={Styles.TextTitle}>
              {language === 'portuguese'
                ? `Progresso total${'\n'}da obra`
                : `Project total${'\n'}progress`}
            </Text>
            <Text style={Styles.TextPercent}>{percent}%</Text>
          </PercentageCircle>
        </View>
      </View>
      <ScrollView>
        {schedules.map((item, index) => (
          <ListInfo key={index} info={item} type="percent" />
        ))}
      </ScrollView>
    </View>
  )
}

export default Schedule;
