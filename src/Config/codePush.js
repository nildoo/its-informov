import codePush from 'react-native-code-push';

const PROTECTED_checkFrequency = codePush.CheckFrequency.MANUAL;
const PROTECTED_mandatoryInstallMode = codePush.InstallMode.IMMEDIATE;

export const initialCodePushOptions = {
  checkFrequency: PROTECTED_checkFrequency,
  mandatoryInstallMode: PROTECTED_mandatoryInstallMode,
};

export const CODE_PUSH_KEY_IOS = '';
export const CODE_PUSH_KEY_ANDROID = 'Uib09Q0wa2hzCSlXRrCnVsJ10MM7mE2IdE7c-';
