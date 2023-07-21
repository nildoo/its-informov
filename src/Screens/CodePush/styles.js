import { Platform, StyleSheet } from 'react-native';
import { normalize, fontScale } from '../../helpers/misc';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    height: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 1,
    shadowOpacity: 0.15,
    borderBottomWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#61417D',
  },
  headerOffSet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: normalize(-200),
    height: normalize(200),
    backgroundColor: '#61417D',
  },
  headerTitle: {
    fontSize: fontScale(16),
    color: '#FFFF',
  },
  loaderContainer: {
    height: normalize(60),
    width: normalize(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCenter: {
    height: normalize(230),
    width: normalize(300),
    alignItems: 'center',
    marginTop: normalize(60),
  },
  progressBar: {
    width: normalize(300),
    height: normalize(3),
    borderRadius: normalize(4),
    marginTop: normalize(10),
  },
  progressBarFill: {
    backgroundColor: '#61417D',
    height: normalize(3),
    borderRadius: normalize(4),
  },
  text: {
    fontSize: fontScale(14),
    marginBottom: normalize(10),
    color: '',
  },
  smallText: {
    fontSize: fontScale(12),
    marginTop: normalize(10),
  },
  flex1: { flex: 1 },
});