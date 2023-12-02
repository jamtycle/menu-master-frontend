import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample inventory data
const sampleInventory = [
  { id: '1', name: 'Tomatoes', quantity: 100 },
  { id: '2', name: 'Potatoes', quantity: 200 },
  { id: '3', name: 'Onions', quantity: 150 },
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  // Initialize inventory data
  const initializeData = async () => {
    try {
      const storedInventory = await AsyncStorage.getItem('inventory');
      if (storedInventory === null) {
        await AsyncStorage.setItem('inventory', JSON.stringify(sampleInventory));
        setInventory(sampleInventory);
      } else {
        setInventory(JSON.parse(storedInventory));
      }
    } catch (error) {
      console.error('Failed to initialize inventory data', error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const updateInventoryItem = async () => {
    try {
      const updatedInventory = inventory.map(item => 
        item.id === editItemId ? { ...item, quantity: parseInt(editQuantity, 10) } : item
      );
      await AsyncStorage.setItem('inventory', JSON.stringify(updatedInventory));
      setInventory(updatedInventory);
      setEditItemId(null);
      setEditQuantity('');
    } catch (error) {
      console.error('Failed to update inventory item', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      {editItemId === item.id ? (
        <TextInput 
          style={styles.input} 
          onChangeText={setEditQuantity} 
          value={editQuantity} 
          keyboardType="numeric" 
          placeholder="Enter new quantity"
        />
      ) : (
        <Text style={styles.itemQuantity}>{`Quantity: ${item.quantity}`}</Text>
      )}
      {editItemId === item.id ? (
        <Button title="Save" onPress={updateInventoryItem} />
      ) : (
        <Button title="Edit" onPress={() => {
          setEditItemId(item.id);
          setEditQuantity(item.quantity.toString());
        }} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: 100,
  },
};