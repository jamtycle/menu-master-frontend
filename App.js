import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import Login from './components/Login';
import PrepList from './components/PrepList';

const AppState = {
  LoginPage: 0,
  PrepPage: 1,
}

export default function App() {
  const [appState, setAppState] = React.useState(AppState.LoginPage);

  const renderElement = () => {
    if (appState === AppState.LoginPage) {
      return <Login onLogin={onLogin} />;
    } else if (appState === AppState.PrepPage) {
      return <PrepList />;
    } else {
      return <></>;
    }
  };

  const onLogin = () => {
    setAppState(AppState.PrepPage);
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderElement()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

// <Login onLogin={onLogin} />
