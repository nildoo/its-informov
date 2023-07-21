import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Colors from '../../Colors';

import Phone from '../../Assets/Img/phone.svg';
import WhatsApp from '../../Assets/Img/whatsapp.svg';

const ItemTeam = ({ item }) => {
  //Remover caracteres do número
  const phone = item.celular
    .replace('(', '')
    .replace(')', '')
    .replace(' ', '')
    .replace('-', '');

  return (
    <View style={Styles.Container}>
      <View style={Styles.SectionInfo}>
        <Image source={{ uri: item.foto }} style={Styles.Image} />
        <View style={Styles.InfoDetails}>
          <Text style={Styles.Name}>{item.nome}</Text>
          <Text style={Styles.Office}>{item.cargo}</Text>
          <Text style={Styles.Phone}>{item.celular}</Text>
        </View>
      </View>
      <View style={Styles.SectionContact}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`https://api.whatsapp.com/send?phone=+55${phone}`);
          }}>
          <WhatsApp style={{ color: '#5FBF54', marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:55${phone}`)}>
          <Phone style={{ color: '#25ABE4' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 24,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SectionContact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  InfoDetails: {
    marginLeft: 8,
  },
  Name: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins SemiBold',
    color: Colors.black,
  },
  Office: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Poppins Regular',
    color: Colors.infoText,
  },
  Phone: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Poppins Regular',
    color: Colors.infoText,
  },
});

export default ItemTeam;
