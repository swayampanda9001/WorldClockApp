import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import TimeDisplay from '../components/TimeDisplay';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const CityTimeScreen = ({route}) => {
  const navigation = useNavigation();
  const user = auth()?.currentUser
  const {city} = route.params;

  if (!user) return navigation.navigate('Login');
  return (
    <ScrollView style={styles.container}>
      <TimeDisplay city={city} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default CityTimeScreen;
