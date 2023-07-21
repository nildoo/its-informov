import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Styles from './styles';
import ItemWork from '../../../../Components/List/ItemWork';
import { AuthContext } from '../../../../Providers/Auth';
import HeaderClose from '../../../../Components/Headers/HeaderClose';
import Colors from '../../../../Colors';
import { useLanguage } from '../../../../hooks/useLanguage';

const ChangeWork = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState(user.info.projects);
  const { language } = useLanguage();


  function filterWork(filter) {
    if (filter) {
      const refProjects = user.info.projects.filter(item => {
        return item.cliente.toLowerCase().includes(filter.toLowerCase());
      });
      setProjects(refProjects);
    } else {
      setProjects(user.info.projects);
    }
  }

  return (
    <View style={Styles.Container}>
      <HeaderClose title={language === 'portuguese' ? 'Alterar obra' : 'Choose Project'} />
      <TextInput
        onChangeText={value => filterWork(value)}
        style={{
          fontFamily: 'Poppins Regular',
          fontSize: 14,
          lineHeight: 14,
          backgroundColor: Colors.white,
          marginTop: 12,
          paddingHorizontal: 8,
          color: Colors.black,
        }}
        placeholder={language === 'portuguese' ? 'Pesquisar...' : 'Search...'}
        placeholderTextColor={Colors.infoText}
      />
      <FlatList
        style={{ marginTop: 12 }}
        data={projects}
        renderItem={({ item }) => <ItemWork work={item} />}
      />
    </View>
  );
};

export default ChangeWork;
