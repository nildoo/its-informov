import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from '@react-native-community/netinfo';

import BackgroundRight from '../../Assets/Img/logo_header.png';
import Eye from '../../Assets/Img/eye.svg';
import ArrowRight from '../../Assets/Img/arrow_right.svg';
import Colors from '../../Colors';
import Styles from './styles';

import Auth from '../../Api/Auth';
import Info from '../../Api/Info';

import { AuthContext } from '../../Providers/Auth';

import Feedback from '../../Components/Feedback';
import { useLanguage } from '../../hooks/useLanguage'

const SignIn = () => {
  const { language, setLanguageTheme } = useLanguage()
  const [focusPassword, setFocusPassoword] = useState(false)
  const [focusLogin, setFocusLogin] = useState(false)
  const [error, setError] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidepass, setHidepass] = useState(true)

  const [loading, setLoading] = useState(false)

  const { setUser, user } = useContext(AuthContext)
  const navigation = useNavigation()

  //Bloquear o retorno da tela
  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault()
    })
  }, [])

  async function handleSignIn() {
    setError(null)
    NetInfo.fetch().then(async state => {
      try {
        if (state.isConnected) {
          setLoading(true)
          const res = await Auth.signIn(email, password)

          if (res.access_token) {
            await AsyncStorage.setItem('access_token', res.access_token)

            const userInfo = await Auth.getIdProject(res.access_token)

            //Pegar o id do primeiro projeto
            await AsyncStorage.setItem('idprj', userInfo.projetos[0].IDPRJ + '')

            const refToken = res.access_token
            const idprj = userInfo.projetos[0].IDPRJ

            const refPhotos = await Info.getDefault(refToken, idprj, 'fotos')
            const refPoints = await Info.getDefault(refToken, idprj, 'pontos')
            const refDetails = await Info.getDefault(
              refToken,
              idprj,
              'detalhes',
            )
            const refSchedules = await Info.getDefault(
              refToken,
              idprj,
              'cronograma',
            )
            const refSummarys = await Info.getDefault(
              refToken,
              idprj,
              'resumo_financeiro',
            )
            const refTeam = await Info.getDefault(
              refToken,
              idprj,
              'equipe_tecnica',
            )
            const refDocuments = await Info.getDefault(
              refToken,
              idprj,
              'documentos',
            )
            const refNotifications = await Info.getDefault(
              refToken,
              idprj,
              'notifications',
            )
            const refMeeting = await Info.getDefault(refToken, idprj, 'pauta')
            const project = await Auth.getIdProject(refToken)

            setUser({
              access_token: res.access_token,
              IDPRJ: userInfo.projetos[0].IDPRJ,
              info: {
                ...user.info,
                documents: refDocuments,
                photos: refPhotos,
                attentionPoints: refPoints,
                details: refDetails,
                schedules: refSchedules,
                summarys: {
                  total: refSummarys.total_executado,
                  data: refSummarys.data,
                },
                team: refTeam,
                meeting: refMeeting,
                email: project.email,
                projects: project.projetos,
                notifications: refNotifications,
              },
            })
          } else {
            setError('Login ou senha inválidos')
          }
          setLoading(false)
        } else {
          setError('Conexão com a internet não encontrada...')
        }
      } catch (e) {
        console.log({ e })
      }
    })
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.BackgroundSection}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}>
          <View style={{ justifyContent: 'flex-end' }}>
            <Image source={BackgroundRight} />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={Styles.FormSection}>
            <Text style={Styles.Title}>
              {language === 'portuguese'
                ? 'Acompanhe sua obra aqui'
                : 'Follow your project here'}
            </Text>
            <TextInput
              placeholder="Login"
              autoCapitalize='none'
              placeholderTextColor={Colors.placeholderInput}
              style={[
                Styles.InputLogin,
                Styles.Input,
                focusLogin && Styles.InputFocus,
              ]}
              onPressIn={() => {
                setFocusLogin(true)
                setFocusPassoword(false)
              }}
              onChangeText={value => setEmail(value)}
              value={email}
            />
            <View
              style={[
                Styles.ViewInputLogin,
                focusPassword && Styles.InputFocus,
              ]}>
              <TextInput
                secureTextEntry={hidepass ? true : false}
                placeholder={language === 'portuguese' ? 'Senha' : 'Password'}
                placeholderTextColor={Colors.placeholderInput}
                style={[Styles.Input, Styles.InputPassword]}
                autoCapitalize='none'
                onPressIn={() => {
                  setFocusLogin(false)
                  setFocusPassoword(true)
                }}
                onChangeText={value => setPassword(value)}
                value={password}
              />
              <TouchableOpacity>
                <Eye onPress={() => setHidepass(!hidepass)} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://zeus.itsinformov.com.br/password/reset',
                )
              }>
              <Text style={Styles.ForgotPassword}>
                {language === 'portuguese'
                  ? 'Esqueci minha senha'
                  : 'Forgot my password'}
              </Text>
            </TouchableOpacity>

            {loading ? (
              <View
                style={{
                  height: 48,
                  marginTop: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={Colors.blueLight} size={32} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleSignIn()}
                style={Styles.ButtonEnter}>
                <Text style={Styles.TextEnter}>
                  {language === 'portuguese' ? 'Entrar' : 'Login'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginTop: 16 }}>
            {error && <Feedback type="error" message={error} />}

            <TouchableOpacity
              style={Styles.ButtonVersion}
              onPress={() =>
                setLanguageTheme(
                  language === 'portuguese'
                    ? language === 'portuguese'
                      ? 'english'
                      : 'portuguese'
                    : language === 'english'
                    ? 'portuguese'
                    : 'english',
                )
              }>
              <Text style={Styles.TextVersion}>
                {language === 'portuguese'
                  ? 'English Version'
                  : 'Versão em português'}
              </Text>
              <ArrowRight color={Colors.blueLight} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

export default SignIn;

