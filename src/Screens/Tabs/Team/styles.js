import {StyleSheet} from 'react-native';

import Colors from '../../../Colors';

export default StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    height: 56,
    backgroundColor: Colors.black,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  HeaderText: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 16,
    color: Colors.white
  }
})