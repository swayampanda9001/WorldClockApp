import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SmartechBaseReact from 'smartech-base-react-native';

const NavbarWithMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const user = auth().currentUser;
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();

      await SmartechBaseReact.logoutAndClearUserIdentity(false);

      // Reset navigation stack to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>World Clock</Text>
      
      <TouchableOpacity 
        style={styles.menuIcon}
        onPress={() => setMenuVisible(true)}
      >
        <Icon name="account-circle" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuContent}>
              <Text style={styles.emailText} numberOfLines={1}>
                {user?.email?.split("@")[0] || user?.phoneNumber || 'Unknown User'}
              </Text>
              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
              >
                <Icon name="logout" size={18} color="red" />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4a6ea9',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 'fit-content',
    marginTop: Platform.OS === 'ios' ? 80 : 60,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContent: {
    padding: 15,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    maxWidth: '100%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'red',
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default NavbarWithMenu;