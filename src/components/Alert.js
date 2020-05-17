import { Platform, Alert as NativeAlert } from 'react-native';

const AlertCustom = msg => {
  if (Platform.OS === 'web') {
    alert(msg);
    return;
  }

  NativeAlert.alert(msg);
};

export default AlertCustom;