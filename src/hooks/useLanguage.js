import { LanguageContext } from '../context/setLanguage';

import React, { useContext } from 'react';

export function useLanguage() {
  const language = useContext(LanguageContext);

  return language;
}

