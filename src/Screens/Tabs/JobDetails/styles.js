import { Platform, StyleSheet } from 'react-native';
import Colors from '../../../Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 21,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  headerTitleSection: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
    color: Colors.white,
    marginRight: 8,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Poppins Regular',
  },
  imagesSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  imageSectionTitle: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleImageSection: {
    marginRight: 8,
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Poppins SemiBold',
  },
  CardsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  CardInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  Card: {
    width: '49%',
    height: 137,
    backgroundColor: Colors.white,
    padding: 16,
    justifyContent: 'space-between',
  },
  CardTitle: {
    minHeight: 32,
    fontSize: 12,
    color: Colors.infoText,
    fontFamily: 'Poppins SemiBold',
  },
  CardInfo: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
  },
  TextCalendar: {
    color: Colors.blueLight,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins Regular',
    marginLeft: 8,
  },

  Footer: {
    marginTop: 8,
    marginBottom: 24,
    flex: 1,
    height: 66,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    padding: 16,
  },
  TitleFooter: {
    fontSize: 12,
    fontFamily: 'Poppins SemiBold',
    color: Colors.infoText,
  },
  FooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextFooterRight: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
    marginRight: 4,
  },
  TextUnitFooter: {
    color: Colors.infoText,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins Regular',
  },
});

