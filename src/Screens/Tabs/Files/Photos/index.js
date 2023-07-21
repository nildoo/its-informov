import React, { useState, useEffect, useContext } from 'react';

import { View, Text } from 'react-native'
import { AuthContext } from '../../../../Providers/Auth'

import Photo from '../../../../Components/Photo'
import Colors from '../../../../Colors'
import Info from '../../../../Api/Info'
import { useLanguage } from '../../../../hooks/useLanguage';

const Photos = () => {
  const [photos, setPhotos] = useState([])
  const [pages, setPages] = useState(0)
  const { user, setUser } = useContext(AuthContext);
  const { language } = useLanguage();

  const [loadingPhotos, setLoadingPhotos] = useState(false)

  async function refreshFotos() {
    setLoadingPhotos(true)
    const query = await Info.getDefault(user.access_token, user.IDPRJ, 'fotos')
    const apiFotos = Object.entries(query)
    setUser({ ...user, info: { ...user.info, photos: query } })
    setPhotos(apiFotos)
    setLoadingPhotos(false)
  }

  const nextPage = () => {
    if (pages === photos.length - 1) {
      return
    }

    setPages(pages + 1)
  }

  const previousPage = () => {
    if (pages === 0) {
      return
    }

    setPages(pages - 1)
  }

  useEffect(() => {
    async function getPhotos() {
      const apiFotos = Object.entries(user.info.photos)
      //Limpar notificações de fotos
      await Info.removeNotification(user.access_token, user.IDPRJ, 'photos')

      setUser({
        ...user,
        info: {
          ...user.info,
          notifications: {
            ...user.info.notifications,
            photos: [],
          },
        },
      })
      setPhotos(apiFotos)
    }
    getPhotos()
  }, [])

  return (
    <>
      <View style={{ flex: 1 }}>
        {!loadingPhotos && photos.length > 0 && (
          <Photo
            photo={photos[pages]}
            refreshFotos={refreshFotos}
            loadingPhotos={loadingPhotos}
          />
        )}
      </View>
      <View
        style={{
          zIndex: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: Colors.white,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: pages === 0 ? Colors.placeholderInput : Colors.blueLight,
            fontFamily: 'Poppins SemiBold',
            alignItems: 'center',
          }}
          onPress={previousPage}>
          {language === 'portuguese' ? 'Anterior' : 'Previous'}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: Colors.blueLight,
            fontFamily: 'Poppins SemiBold',
          }}>
          {pages + 1}/{photos.length}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color:
              pages === photos.length - 1
                ? Colors.placeholderInput
                : Colors.blueLight,
            fontFamily: 'Poppins SemiBold',
          }}
          onPress={nextPage}>
          {language === 'portuguese' ? 'Próximo' : 'Next'}
        </Text>
      </View>
    </>
  )
}

export default Photos;

