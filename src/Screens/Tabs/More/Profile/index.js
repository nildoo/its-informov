import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import Styles from './styles';
import HeaderButtonReturn from '../../../../Components/Headers/HeaderButtonReturn';
import ItemProfile from '../../../../Components/List/ItemProfile';
import { AuthContext } from '../../../../Providers/Auth';
import { useLanguage } from '../../../../hooks/useLanguage'

const Profile = () => {
  const { language } = useLanguage()
  const { user } = useContext(AuthContext)
  return (
    <View style={Styles.Container}>
      <HeaderButtonReturn
        title={language === 'portuguese' ? 'Minha conta' : 'My account'}
      />
      <View style={Styles.Area}>
        <Text style={Styles.Title}>
          {language === 'portuguese' ? 'Acesso' : 'Login'}
        </Text>
        <ItemProfile
          title={'E-mail'}
          isClicked={false}
          info={user.info.email}
        />
        <ItemProfile
          title={language === 'portuguese' ? 'Senha' : 'Password'}
          isClicked={true}
          info={language === 'portuguese' ? 'Alterar' : 'Change'}
        />
        <Text style={Styles.Title}>
          {language === 'portuguese'
            ? ' Configurações e informações'
            : 'Configuration and info'}
        </Text>
        <ItemProfile
          title={language === 'portuguese' ? 'Notificações' : 'Notifications'}
          isClicked={true}
          info={language === 'portuguese' ? 'Acessar' : 'Access'}
        />
        <ItemProfile
          title={
            language === 'portuguese'
              ? 'Política de privacidade'
              : 'Privacy Policy'
          }
          isClicked={true}
          info={language === 'portuguese' ? 'Acessar' : 'Access'}
        />
        <ItemProfile
          title={language === 'portuguese' ? 'Compliance' : 'Compliance'}
          isClicked={true}
          info={language === 'portuguese' ? 'Acessar' : 'Access'}
        />
      </View>
    </View>
  )
}

export default Profile;

