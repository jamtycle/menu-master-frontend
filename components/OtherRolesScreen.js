import React from 'react';
import { View, Text } from 'react-native';

const OtherRolesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Access is limited to specific roles only.</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
};

export default OtherRolesScreen;