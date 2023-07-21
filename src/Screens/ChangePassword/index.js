import React, { useState, useContext } from 'react'

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import HeaderClose from '../../Components/Headers/HeaderClose'

import Colors from '../../Colors'

import Auth from '../../Api/Auth'

import { AuthContext } from '../../Providers/Auth'

import Feedback from '../../Components/Feedback'
import { useLanguage } from '../../hooks/useLanguage'

const ChangePassword = () => {
  const [changeConfirmed, setChangeConfirmed] = useState(false)
  const { language } = useLanguage()
  const { user } = useContext(AuthContext)

  const [error, setError] = useState([])

  const [currentPassword, setCurrentPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')

  const [newPassowordConfirmation, setNewPasswordConfirmation] = useState('')

  const [loadingChange, setLoadingChange] = useState(false)

  async function HandleChangePassword() {
    setError(null)

    setLoadingChange(true)

    if (
      newPassword === '' ||
      currentPassword === '' ||
      newPassowordConfirmation === ''
    ) {
      setError(['Preencha todos os campos'])
    } else if (newPassword !== newPassowordConfirmation) {
      setError(['Senhas não coincidem!'])
    } else {
      const response = await Auth.changePassword(
        user.access_token,

        currentPassword,

        newPassword,
      )

      if (response.errors) {
        if (response.errors.new_password) {
          setError(response.errors.new_password)
        } else if (response.errors.current_password) {
          setError(response.errors.current_password)
        }
      } else {
        setChangeConfirmed(true)
      }
    }

    setLoadingChange(false)
  }

  return (
    <>
      <HeaderClose
        title={language === 'portuguese' ? 'Alterar Senha' : 'Change Password'}
      />

      {!changeConfirmed ? (
        <View style={Styles.Container}>
          <TextInput
            style={Styles.Input}
            placeholder={
              language === 'portuguese'
                ? 'Digite a senha atual'
                : 'Enter current password'
            }
            secureTextEntry
            placeholderTextColor="#000"
            value={currentPassword}
            onChangeText={value => setCurrentPassword(value)}
          />

          <TextInput
            style={Styles.Input}
            placeholder={
              language === 'portuguese' ? 'Nova senha' : 'New Password'
            }
            secureTextEntry
            placeholderTextColor="#000"
            value={newPassword}
            onChangeText={value => setNewPassword(value)}
          />

          <TextInput
            style={Styles.Input}
            placeholder={
              language === 'portuguese'
                ? 'Confirmar nova senha'
                : 'Confirm new password'
            }
            secureTextEntry
            placeholderTextColor="#000"
            value={newPassowordConfirmation}
            onChangeText={value => setNewPasswordConfirmation(value)}
          />

          <View style={{ marginTop: 8 }}>
            {error &&
              error.map((item, index) => (
                <Feedback key={index} message={error} type="error" />
              ))}
          </View>

          {loadingChange ? (
            <View style={{ height: 48, marginTop: 24 }}>
              <ActivityIndicator size={32} color={Colors.blueLight} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => HandleChangePassword()}
              style={Styles.ButtonConfirm}>
              <Text style={Styles.TextConfirm}>
                {language === 'portuguese' ? 'Confirmar' : 'Confirm'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={Styles.Confirmed}>
          <Feedback
            message={'Sua senha foi alterada com sucesso!'}
            type="success"
          />
        </View>
      )}
    </>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,

    paddingHorizontal: 16,
  },

  Input: {
    fontFamily: 'Poppins Regular',

    color: Colors.black,

    fontSize: 16,

    marginTop: 16,

    borderBottomColor: Colors.borderColor,

    borderBottomWidth: 1,
  },

  ButtonConfirm: {
    marginTop: 24,

    height: 48,

    backgroundColor: Colors.blueLight,

    justifyContent: 'center',

    alignItems: 'center',
  },

  TextConfirm: {
    fontSize: 16,

    fontFamily: 'Poppins SemiBold',

    color: Colors.white,

    lineHeight: 24,
  },

  Confirmed: {
    paddingTop: 8,

    flex: 1,

    paddingHorizontal: 16,
  },
})

export default ChangePassword
