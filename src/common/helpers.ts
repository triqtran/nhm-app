import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

type DeviceType = {
  iPhone?: any;
  iPad?: any;
  android?: any;
  tablet?: any;
}

function selectDevice (props: DeviceType) {
  if (Platform.OS === 'ios') {
    return Platform.isPad
      ? (props?.iPad || props?.tablet || null)
      : (props?.iPhone || props?.android || null);
  }
  if (Platform.OS === 'android') {
    return DeviceInfo.isTablet()
      ? (props?.tablet || props?.iPad || null)
      : (props?.android || props?.iPhone || null);
  }
  return null;
}

export default {
  selectDevice
}