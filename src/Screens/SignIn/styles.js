import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  BackgroundSection: {
    flex: 1,
  },
  backgroundRight: {},
  logo: {
    top: -72,
    left: 56,
  },
  FormSection: {
    zIndex: 1,
    // paddingLeft: 56,
    // paddingRight: 32,
    paddingHorizontal: 32,
  },
  Title: {
    fontSize: 16,
    fontFamily: 'Poppins Bold',
    color: Colors.black,
  },
  Input: {
    fontFamily: 'Poppins Regular',
    color: Colors.black,
    fontSize: 16,
  },
  InputLogin: {
    marginTop: 16,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  InputPassword: {
    width: '90%',
  },
  InputFocus: {
    borderBottomColor: Colors.blueLight,
    borderBottomWidth: 2,
  },
  ViewInputLogin: {
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ForgotPassword: {
    marginTop: 16,
    fontSize: 12,
    fontFamily: 'Poppins Medium',
    color: Colors.blueLight,
  },
  ButtonEnter: {
    marginTop: 24,
    height: 48,
    backgroundColor: Colors.blueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextEnter: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: Colors.white,
    lineHeight: 24,
  },
  ButtonVersion: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: Colors.white,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
    paddingLeft: 56,
    paddingRight: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextVersion: {
    fontSize: 12,
    fontFamily: 'Poppins Medium',
    color: Colors.blueLight,
  },
});
