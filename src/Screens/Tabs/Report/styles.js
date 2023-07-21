import { StyleSheet } from 'react-native';
import Colors from '../../../Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderSection: {
    height: '53%',
    backgroundColor: Colors.black,
    paddingTop: 64,
    alignItems: 'center',
  },
  HeaderTitle: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: 'Poppins SemiBold',
  },
});
