import Constants from 'expo-constants';

const API_URL = __DEV__ 
  ? 'http://192.168.1.15:3000/api'
  : Constants.expoConfig?.extra?.apiUrl ;

export default {
  API_URL,
  DEEP_LINK_PREFIX: 'gnawaapp://'
};