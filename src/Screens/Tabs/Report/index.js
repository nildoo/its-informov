import React from 'react';

import { View, Text } from 'react-native';

import Styles from './styles';

import CardReport from '../../../Components/CardReport';
import Colors from '../../../Colors';

import Warning from '../../../Assets/Img/warning.svg';
import Money from '../../../Assets/Img/money.svg';
import Clock from '../../../Assets/Img/clock.svg';
import Pen from '../../../Assets/Img/pen.svg';
import { useLanguage } from '../../../hooks/useLanguage'

const Report = () => {
  const { language } = useLanguage()
  return (
    <View style={Styles.container}>
      <View style={Styles.HeaderSection}>
        <Text style={Styles.HeaderTitle}>
          {language === 'portuguese'
            ? `Acompanhe${'\n'}aqui seus${'\n'}relatórios`
            : `Follow your${'\n'}reports here`}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: -72 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CardReport
            route="PointsAttention"
            color={Colors.card.danger}
            Icon={Warning}
            text={
              language === 'portuguese'
                ? `Pontos de${'\n'}atenção`
                : `Points of${'\n'}attention`
            }
          />
          <CardReport
            route="Summary"
            color={Colors.card.secondary}
            Icon={Money}
            text={
              language === 'portuguese'
                ? `Resumo${'\n'}financeiro`
                : `Financial${'\n'}summary`
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '2%',
          }}>
          <CardReport
            route="Schedule"
            color={Colors.card.primary}
            Icon={Clock}
            text={
              language === 'portuguese'
                ? `Progresso do${'\n'}cronograma`
                : `Time schedule${'\n'}progress`
            }
          />
          <CardReport
            route="Meeting"
            color={Colors.card.warning}
            Icon={Pen}
            text={
              language === 'portuguese'
                ? `Resumo da${'\n'}reunião`
                : `Meeting${'\n'}summary`
            }
          />
        </View>
      </View>
    </View>
  )
}

export default Report;
