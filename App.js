import React, { useState, useEffect, useRef } from 'react';
// AsyncStorage
import { SafeAreaView } from 'react-native';
// Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// Stack Navigator
import { createStackNavigator } from '@react-navigation/stack';

// Components
import Login from './components/Login';
import PrepList from './components/PrepList';
import InventoryManagement from './components/InventoryManagement';
import OtherRolesScreen from './components/OtherRolesScreen';
import RecipeDetails from './components/RecipeDetails'; 

const Stack = createStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const navigationRef = useRef();
  

  useEffect(() => {
    if (userRole && navigationRef.current) {
      switch (userRole) {
        case 'chef':
          navigationRef.current.navigate('PrepList');
          break;
        case 'manager':
          navigationRef.current.navigate('InventoryManagement');
          break;
        default:
          navigationRef.current.navigate('OtherRoles');
          break;
      }
    }
  }, [userRole, navigationRef]);
  
  const onLogin = (role) => {
    // Set the user role based on the selected role
    setUserRole(role);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login">
            {props => <Login {...props} onLoginProp={onLogin} />}
          </Stack.Screen>
          <Stack.Screen name="PrepList" component={PrepList} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen name="InventoryManagement" component={InventoryManagement} />
          <Stack.Screen name="OtherRoles" component={OtherRolesScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
};