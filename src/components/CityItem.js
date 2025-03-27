import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getCurrentTime} from '../utils/timeUtils';
import {useNavigation} from '@react-navigation/native';
import SmartechBaseReact from 'smartech-base-react-native';
import uuid from 'react-native-uuid';

const CityItem = ({city, removeCity}) => {
  const navigation = useNavigation();

  const navigateToCityTime = async () => {
    try {
      const payloadata = {
        name: city.name,
        description: city.description,
        payload_id: city.id,
        event_id: uuid.v4(),
      };
      await SmartechBaseReact.trackEvent('Cities Clicked', payloadata);
  
      navigation.navigate('CityTime', {city});
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <TouchableOpacity style={styles.item} onPress={navigateToCityTime}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.countryName}>{city.country}</Text>
          <Text style={styles.currentTime}>
            {getCurrentTime(city.timezone)}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="timer" size={24} color="#4a6ea9" />
          <TouchableOpacity
            disallowInterruption={true}
            onPress={() => removeCity(city.id)}>
            <Icon name="delete" size={24} color="#ff0000" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  countryName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  currentTime: {
    fontSize: 16,
    color: '#4a6ea9',
    marginTop: 8,
    fontWeight: '500',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '20px',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#4a6ea9',
  },
});

export default CityItem;
