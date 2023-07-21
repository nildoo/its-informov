import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../../../../Colors';
import Badge from '../../../../Components/Badge';

import Header from '../../../../Components/Header';
import { useLanguage } from '../../../../hooks/useLanguage'

import { AuthContext } from '../../../../Providers/Auth';

const Meeting = () => {
  const { user } = useContext(AuthContext);
  const { language } = useLanguage()
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function getMeetings() {
      setMeetings(user.info.meeting);
    }
    getMeetings();
  }, []);

  function MeetingItem({ item }) {
    return (
      <View style={Styles.ItemMeeting}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Badge
            backgroundColor={Colors.feedback.successBackground}
            color={Colors.feedback.textSuccess}
            text={item.status}
          />
        </View>
        <Text style={Styles.Title}>{item.assunto}</Text>
        <Text style={Styles.Info}>{item.plano_acao}</Text>

        <Text style={Styles.Data}>
          Resp. {item.responsavel} - Prazo: {item.prazo}
        </Text>
      </View>
    );
  }

  return (
    <>
      <Header
        title={
          language === 'portuguese' ? 'Resumo da reunião' : 'Meeting summary'
        }
      />
      <ScrollView>
        {meetings.map((item, index) => (
          <MeetingItem item={item} key={index} />
        ))}
      </ScrollView>
    </>
  )
};

const Styles = StyleSheet.create({
  ItemMeeting: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  Title: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins SemiBold',
    lineHeight: 20,
  },
  Data: {
    fontSize: 12,
    color: Colors.infoText,
    fontFamily: 'Poppins SemiBold',
  },
  Info: {
    fontSize: 14,
    marginTop: 4,
    color: Colors.infoText,
    fontFamily: 'Poppins Regular',
  },
});

export default Meeting;
