import React from 'react';
import { Text, TextInput, StyleSheet, ImageBackground, Button, Alert } from 'react-native';

const image = { uri: 'https://culinarylabschool.com/wp-content/uploads/2019/06/Pros-and-cons-to-working-in-culinary-arts-CulinaryLab-School-1024x683.jpg' };

export default function Login(props) {
  const [username, onChangeUsername] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const onLogin = () => {
    Alert.alert(`Login info: ${username} ${password}`);
    if (!username || !password) return;
    props.onLogin();
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Menu Master</Text>
        <Text style={styles.subTitle}>Welcome back</Text>

        <TextInput id="username" style={styles.input} onChangeText={onChangeUsername} value={username} placeholder={"Username"} />
        <TextInput id="password" secureTextEntry={true} style={styles.input} onChangeText={onChangePassword} value={password} placeholder={"Password"} />

        <Button title="Login" onPress={onLogin}/>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff"
  },
});
