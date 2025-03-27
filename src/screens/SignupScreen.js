import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import SmartechBaseReact from 'smartech-base-react-native';

const Signup = () => {
  const navigation = useNavigation();
  const user = auth()?.currentUser;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  const onSignup = () => {
    setSigningUp(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const payloadata = {
          FIRST_NAME: email.split('@')[0],
          LAST_NAME: '',
          AGE: '',
          COUNTRY: 'India',
          STATE: 'Orissa',
          CITY: 'Berhampur',
          PINCODE: '760002',
        };

        await SmartechBaseReact.updateUserProfile(
          payloadata,
          function (response) {
            console.log(response)
          },
          function (error) {
            console.log(error)
          },
        );

        Alert.alert('User signed up successfully');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        Alert.alert(error.message);
        setSigningUp(false);
      });
  };

  useEffect(() => {
    if (user) {
      navigation.navigate('CityList');
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onSignup} disabled={signingUp}>
        <Text style={styles.buttonText}>
          {signingUp? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <View style={styles.promptText}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupLinkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: '#C8C8C8',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#4a6ea9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 15,
  },
  switchButtonText: {
    color: '#6200ea',
    fontSize: 14,
  },
  heading: {
    fontSize: 30,
    margin: 10,
  },
  promptText: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupLinkText: {
    color: '#6200ea',
    fontWeight: 'bold',
    marginLeft: 3,
  },
});

export default Signup;
