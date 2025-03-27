import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import { Alert } from 'react-native';
// import SmartechPushReact from 'smartech-push-react-native';

const usePushNotification = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,);
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // SmartechPushReact.setDevicePushToken(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const listenToForegroundNotifications = async () => { // Listen for incoming notifications when app is opened
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // SmartechPushReact.handlePushNotification(remoteMessage.data,(result) => {
      //   console.log('isNotificationHandled by smartech :: ', result);
      //   // if result is false then notification is from other sources
      // })
      Alert.alert(remoteMessage?.notification?.title, remoteMessage?.notification?.body);
    });
    return unsubscribe;
  };

  const listenToBackgroundNotifications = async () => { // Listen for incoming notifications when app is in background
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        // SmartechPushReact.handlePushNotification(remoteMessage.data, (result) => {
        //   console.log('isNotificationHandled by smartech :: ', result);
        //   // if result is false then notification is from other sources
        // })
        console.log(
          'A new message arrived! (BACKGROUND)',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
  };
};

export default usePushNotification;