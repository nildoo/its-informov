import React, { useState, useEffect, useContext } from 'react';

import { View, Text, FlatList, SafeAreaView } from 'react-native';

import ItemTeam from '../../../Components/List/ItemTeam';
import { useLanguage } from '../../../hooks/useLanguage'
import { AuthContext } from '../../../Providers/Auth'

import Styles from './styles'

const Team = () => {
  const { language } = useLanguage()
  const { user } = useContext(AuthContext)
  const [listTeam, setListTeam] = useState([])

  useEffect(() => {
    async function getTeam() {
      setListTeam(user.info.team)
    }
    getTeam()
  }, [])

  return (
    <SafeAreaView style={Styles.Container}>
      <View style={Styles.Header}>
        <Text style={Styles.HeaderText}>
          {language === 'portuguese' ? 'Equipe técnica' : 'Team'}
        </Text>
      </View>
      <FlatList
        style={{ paddingBottom: 32 }}
        data={listTeam}
        renderItem={({ item }) => <ItemTeam item={item} />}
      />
    </SafeAreaView>
  )
}

export default Team;

