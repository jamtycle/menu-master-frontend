import React, { useState } from 'react';
import { Text, TextInput, ImageBackground, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const image = { uri: 'https://culinarylabschool.com/wp-content/uploads/2019/06/Pros-and-cons-to-working-in-culinary-arts-CulinaryLab-School-1024x683.jpg' };

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('manager');

  const onLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('http://170.187.155.55:27041/login', {
        username,
        password,
      });

      if (response.data.code === 200) {
        // Authentication successful
        onLoginProp(userRole);
        navigation.navigate('InventoryManagement');
      } else {
        // Authentication failed
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Menu Master</Text>
      <Text style={styles.subTitle}>Welcome back</Text>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />

      <Picker
        selectedValue={userRole}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setUserRole(itemValue)}
      >
        <Picker.Item label="Manager" value="manager" />
        <Picker.Item label="Chef" value="chef" />
        <Picker.Item label="Staff" value="staff" />
      </Picker>

      <Button title="Login" onPress={onLogin} />
    </ImageBackground>
  );
};

const styles = {
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  subTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    height: 50,
    margin: 12,
    backgroundColor: "#ffffff",
  },
};