import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Colors';
import Badge from './Badge';

const CardAttention = ({ point }) => {
  var color, backgroundColor;

  if (point.impacto == 'Alto') {
    color = Colors.feedback.textError;
    backgroundColor = Colors.feedback.errorBackground;
  } else if (point.impacto == 'Médio') {
    color = Colors.feedback.textWarning;
    backgroundColor = Colors.feedback.warningBackground;
  } else if (point.impacto == 'Baixo') {
    color = Colors.feedback.textWaiting;
    backgroundColor = Colors.feedback.waitingBackground;
  } else {
    color = Colors.black;
    backgroundColor = '#E5E5E5';
  }

  return (
    <View style={Styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Badge
          backgroundColor={backgroundColor}
          color={color}
          text={point.impacto}
        />
      </View>
      <Text style={Styles.title}>{point.categoria}</Text>
      <Text style={Styles.description}>{point.descricao}</Text>
    </View>
  )
};

const Styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: Colors.black,
    marginTop: 12,
  },
  date: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Poppins Bold',
    color: Colors.infoText,
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.infoText,
    fontFamily: 'Poppins Regular',
  },
});

export default CardAttention;
