import { StyleSheet } from 'react-native';
import Colors from '../../../../Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  SectionHeader: {
    marginTop: -8,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#479C3E',
  },
  SectionPercent: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1D4A17',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.white,
    fontFamily: 'Poppins Regular',
  },
  TextPercent: {
    textAlign: 'center',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.white,
    fontFamily: 'Poppins SemiBold',
  },
});
