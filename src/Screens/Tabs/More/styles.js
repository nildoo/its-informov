import { StyleSheet } from 'react-native';
import Colors from '../../../Colors';

export default StyleSheet.create({
  Container: {
    flex: 1,
  },
  SectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Logo: {
    marginTop: 33,
    height: 46,
    width: 50,
  },
  Card: {
    marginLeft: 56,
    marginRight: 32,
  },
  CardPrimary: {
    marginTop: -100,
    backgroundColor: Colors.black,
    borderTopEndRadius: 2,
    borderTopStartRadius: 2,
    paddingLeft: 24,
    paddingRight: 18,
  },
  SectionBadge: {
    marginTop: -10,
    flexDirection: 'row',
  },
  Title: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    marginLeft: 8,
    color: '#FFF',
  },
  CardButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 18,
    paddingVertical: 13,
    height: 40,
    borderBottomEndRadius: 2,
    borderBottomStartRadius: 2,
  },
  TextButton: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Poppins Regular',
  },
  Local: {
    color: '#BEBEBE',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 18,
    fontFamily: 'Poppins Regular',
  },
  SectionBtn: {
    marginLeft: 56,
    marginRight: 32,
  },
  BtnSignOut: {
    marginVertical: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#777',
  },
  BtnText: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 16,
    color: '#777',
  },
});
