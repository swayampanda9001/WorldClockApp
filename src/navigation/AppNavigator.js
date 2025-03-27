import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';
import CityListScreen from '../screens/CityListScreen';
import CityTimeScreen from '../screens/CityTimeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4a6ea9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'World Clock'}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{title: 'World Clock'}}
        />
        {/* <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          /> */}
        <Stack.Screen
          name="CityList"
          component={CityListScreen}
          options={{title: 'World Clock', headerShown: false}}
        />
        <Stack.Screen
          name="CityTime"
          component={CityTimeScreen}
          options={({route}) => ({title: route.params.city.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
