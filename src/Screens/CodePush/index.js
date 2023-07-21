import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Text,
} from 'react-native';
import codePush from 'react-native-code-push';
import RNRestart from 'react-native-restart';
import {
  CODE_PUSH_KEY_IOS,
  CODE_PUSH_KEY_ANDROID,
} from '../../Config/codePush';

import styles from './styles';

const CodepushInstallScreen = ({ navigation }) => {
  const [updateText, setUpdateText] = useState('');
  const [progress, setProgress] = useState(0);
  const [codePushSyncStatus, setCodePushSyncStatus] = useState();
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const successCodePush = [
    codePush.SyncStatus.UP_TO_DATE,
    codePush.SyncStatus.UPDATE_INSTALLED,
  ];

  const getDeploymentKey = () =>
    Platform.select({
      ios: CODE_PUSH_KEY_IOS,
      android: CODE_PUSH_KEY_ANDROID,
    });

  useEffect(() => {
    if (!successCodePush.includes(codePushSyncStatus)) {
      try {
        codePush.sync(
          {
            installMode: codePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: getDeploymentKey(),
          },
          status => {
            console.log({ status });
            setCodePushSyncStatus(status);
          },
          ({
            receivedBytes: codePushReceiveBytes,
            totalBytes: codePushTotalBytes,
          }) => {
            const downloadProgress =
              (codePushReceiveBytes / codePushTotalBytes) * 100;

            setUpdateText(`${Math.round(downloadProgress)}`);
            setProgress(downloadProgress);
            setReceivedBytes(codePushReceiveBytes);
            setTotalBytes(codePushTotalBytes);
          },
        );
      } catch (error) {
        throw new Error(
          `Erro ao sincronizar o CodePush.\nErro: ${error.message}`,
        );
      }
    }
  }, [receivedBytes, totalBytes, successCodePush, codePushSyncStatus]);

  useEffect(() => {
    if (
      receivedBytes === totalBytes &&
      successCodePush.includes(codePushSyncStatus)
    ) {
    }
  }, [receivedBytes, totalBytes, successCodePush, codePushSyncStatus]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex1}>
        <View style={styles.header}>
          <View style={styles.headerOffSet} />
          <Text bold style={styles.headerTitle}>
            Atualizando App
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyCenter}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
            <Text style={styles.text}>Instalando</Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressBarFill, { width: `${progress}%` }]}
              />
            </View>
            {!!receivedBytes ? (
              <Text
                style={
                  styles.smallText
                }>{`(${receivedBytes}/${totalBytes})  ${updateText}%`}</Text>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CodepushInstallScreen;