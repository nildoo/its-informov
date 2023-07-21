import { StyleSheet } from 'react-native';
import Colors from '../../Colors';

export default StyleSheet.create({
  Container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'space-between',
  },
  Footer: {
    borderTopColor: Colors.white,
    borderTopWidth: 1,
    paddingVertical: 8,
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SectionFooterKeyboardOpened: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingLeft: 4,
    flex: 1,
    borderRadius: 2,
    borderColor: '#BEBEBE',
    borderWidth: 1,
  },
  FooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextMessage: {
    width: '84%',
    padding: 10,
    fontSize: 14,
    color: Colors.black,
  },
});

