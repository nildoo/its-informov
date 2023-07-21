import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Pressable,
} from 'react-native'
import Colors from '../Colors'

import { useNavigation } from '@react-navigation/native'

import Badge from './Badge'

const Photos = ({ photo, refreshFotos, loadingPhotos }) => {
  //photo: [data,[object]

  const navigation = useNavigation()

  return (
    <View style={Styles.container}>
      <View style={Styles.SectionTitle}>
        <Text style={Styles.Title}>{photo[0]}</Text>
        <Text
          style={{
            fontFamily: 'Poppins SemiBold',
            fontSize: 12,
            lineHeight: 14,
            color: Colors.infoText,
          }}>
          Total: {photo[1].length}
        </Text>
      </View>
      <FlatList
        onRefresh={refreshFotos}
        refreshing={loadingPhotos}
        data={photo[1]}
        keyExtractor={item => item?.arquivo}
        numColumns={3}
        horizontal={false}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: '32%', margin: 2, height: 104, overflow: 'hidden' }}
            onPress={() =>
              navigation.navigate('ImageMessage', { photo: item })
            }>
            <ImageBackground
              resizeMode="cover"
              source={{ uri: item?.thumb }}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 2 }}>
                <Text numberOfLines={1} style={{ color: Colors.white }}>
                  {item?.arquivo}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />

    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: Colors.white,
  },
  SectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Title: {
    marginRight: 8,
    fontFamily: 'Poppins SemiBold',
    color: Colors.black,
  },
  TitleImage: {
    alignSelf: 'center',
    fontFamily: 'Poppins Regular',
    fontWeight: '400',
    fontSize: 10,
    minWidth: 100,
    color: Colors.white,
  },
})

export default Photos;

