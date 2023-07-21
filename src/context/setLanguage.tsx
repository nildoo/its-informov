import React from 'react'
import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const defautValues = {
  language: '',
  setLanguageTheme: language => {},
}

export const LanguageContext = createContext(defautValues)

export function LanguageProvider({ childrens }) {
  const [language, setLanguage] = useState('portuguese')

  const setLanguageTheme = async languageTheme => {
    setLanguage(languageTheme)
    await AsyncStorage.setItem('@languageThemeInformov', languageTheme)
  }

  const getTheme = async () => {
    const data = await AsyncStorage.getItem('@languageThemeInformov')
    if (data) {
      const res = data

      return res
    }
    return 'portuguese'
  }

  useEffect(() => {
    const loadTheme = async () => {
      const data = await getTheme()

      setLanguageTheme(data)
    }
    loadTheme()
  }, [])
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguageTheme,
      }}>
      {childrens}
    </LanguageContext.Provider>
  )
}
