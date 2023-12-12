import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  const initializeData = async () => {
    try {
      const response = await axios.get('http://170.187.155.55:27041/products');
      setInventory(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch inventory data', error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const updateInventoryItem = async (itemId) => {
    try {
      const updatedInventory = inventory.map(item =>
        item._id === itemId ? { ...item, quantity: parseInt(editQuantity, 10) } : item
      );

      // Update the backend with the new quantity
      await axios.put('http://170.187.155.55:27041/products', {
        _id: itemId,
        quantity: parseInt(editQuantity, 10),
      });

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
      {editItemId === item._id ? (
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
      {editItemId === item._id ? (
        <Button title="Save" onPress={() => updateInventoryItem(item._id)} />
      ) : (
        <Button
          title="Edit"
          onPress={() => {
            setEditItemId(item._id);
            setEditQuantity(item.quantity.toString());
          }}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>
      <FlatList data={inventory} keyExtractor={(item) => item._id} renderItem={renderItem} />
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