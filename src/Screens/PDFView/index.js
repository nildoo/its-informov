import React from 'react';
import { View, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import HeaderButtonReturn from '../../Components/Headers/HeaderButtonReturn';

const PDFView = ({ route }) => {
  const source = route.params.source;

  return (
    <View style={{ flex: 1 }}>
      <HeaderButtonReturn title={route.params.name} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 25,
        }}>
        <Pdf
          source={{ uri: source, cache: false }}
          onError={error => {}}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    </View>
  );
};

export default PDFView;

