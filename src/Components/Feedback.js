import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Colors';

const Feedback = ({ type, message }) => {
  return (
    <>
      {type === 'error' && (
        <View style={[Styles.container, Styles.errorBackground]}>
          <Text style={[Styles.text, Styles.textError]}>{message}</Text>
        </View>
      )}
      {type === 'success' && (
        <View style={[Styles.container, Styles.successBackground]}>
          <Text style={[Styles.text, Colors.feedback.textSuccess]}>
            {message}
          </Text>
        </View>
      )}
      {type === 'waiting' && (
        <View style={[Styles.container, Styles.waitingBackground]}>
          <Text style={[Styles.text, Styles.textWaiting]}>{message}</Text>
        </View>
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: 32,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  errorBackground: {
    backgroundColor: Colors.feedback.errorBackground,
  },
  textError: {
    color: Colors.feedback.textError,
  },
  successBackground: {
    backgroundColor: Colors.feedback.successBackground,
  },
  textSuccess: {
    color: Colors.feedback.textSuccess,
  },
  waitingBackground: {
    backgroundColor: Colors.feedback.waitingBackground,
  },
  textWaiting: {
    color: Colors.feedback.textWaiting,
  },
});

export default Feedback;
