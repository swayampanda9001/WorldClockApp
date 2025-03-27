import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCurrentTime, getCurrentDate, getTimeOffset } from '../utils/timeUtils';

const TimeDisplay = ({ city }) => {
  const [time, setTime] = useState(getCurrentTime(city.timezone));
  const [date, setDate] = useState(getCurrentDate(city.timezone));
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime(city.timezone));
      setDate(getCurrentDate(city.timezone));
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [city.timezone]);
  
  return (
    <View style={styles.container}>
      <View style={styles.timeCard}>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.countryName}>{city.country}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.timezone}>{getTimeOffset(city.timezone)}</Text>
        <Text style={styles.description}>{city.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  timeCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  countryName: {
    fontSize: 20,
    color: '#666',
    marginBottom: 15,
  },
  time: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4a6ea9',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  timezone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default TimeDisplay;