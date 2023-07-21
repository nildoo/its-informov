import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ text, color, backgroundColor }) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text numberOfLines={1} style={[styles.text, { color: color }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    borderRadius: 22,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins Bold',
  },
});

export default Badge;
