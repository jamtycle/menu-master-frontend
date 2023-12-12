import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import CheckBox from 'react-native-check-box';
import axios from 'axios';

const recipeData = [
  { key: '1', value: 'Duck Risotto', ingredients: ['Duck meat', 'Spices'], steps: ['Step 1', 'Step 2', 'Step 4'] },
  { key: '2', value: 'Chicken Supreme', ingredients: ['Chicken meat', 'Herbs', 'Salt', 'Pepper'], steps: ['Step 1', 'Step 2', 'Step 3'] },
  { key: '3', value: 'Braised Beef Shortrib', ingredients: ['Beef Shortrib', 'Seasonings', 'Mashed Potatoes'], steps: ['Step 1', 'Step 2', 'Step 3'] },
];

export default function PrepList({ navigation }) {
  const [prepList, setPrepList] = useState([]);
  const [selectedRecipeValue, setSelectedRecipeValue] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      let storedPrepList = await AsyncStorage.getItem('prepList');
      if (storedPrepList === null) {
        storedPrepList = recipeData.map(item => ({
          ...item,
          name: item.value,
          status: 'pending'
        }));
        await AsyncStorage.setItem('prepList', JSON.stringify(storedPrepList));
      } else {
        storedPrepList = JSON.parse(storedPrepList);
      }
      setPrepList(storedPrepList);
    } catch (error) {
      console.error('Failed to initialize prep list data', error);
    }
  };  
  
  useEffect(() => {
    initializeData();
  }, []);
  
  const onItemAdd = async () => {
    if (!selectedRecipeValue) {
      Alert.alert('Please select a recipe to add');
      return;
    }
  
    const selectedRecipe = recipeData.find(r => r.value === selectedRecipeValue);
    if (selectedRecipe) {
      const newItem = {
        name: selectedRecipe.value,
        ingredients: selectedRecipe.ingredients,
        status: 'pending'
      };
  
      const updatedPrepList = [...prepList, newItem];
      setPrepList(updatedPrepList);
      await AsyncStorage.setItem('prepList', JSON.stringify(updatedPrepList));
    }
  };  

  const handleSelectItem = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(item => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const markItemsAsFinished = async () => {
    let updatedPrepList = prepList.map(item => {
      if (selectedItems.includes(item.name)) {
        return { ...item, status: 'finished' };
      }
      return item;
    });

    setPrepList(updatedPrepList);
    await AsyncStorage.setItem('prepList', JSON.stringify(updatedPrepList));
    setSelectedItems([]);
  };

  const showRecipeCard = (recipeName) => {
    const recipe = recipeData.find(r => r.value === recipeName);
    if (recipe) {
      navigation.navigate('RecipeDetails', { recipe });
    } else {
      Alert.alert('Error', 'Recipe not found');
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <CheckBox
        isChecked={selectedItems.includes(item.name)}
        onClick={() => handleSelectItem(item.name)}
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Button title="See Recipe" onPress={() => showRecipeCard(item.name)} />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prep List</Text>

      <SelectList
        setSelected={setSelectedRecipeValue}
        data={recipeData.map(recipe => ({ key: recipe.value, value: recipe.value }))}
        placeholder="Select a Recipe"
      />

      <Button title="Add Item" onPress={onItemAdd} />

      <FlatList
        data={prepList.filter(p => p.status === 'pending')}
        renderItem={renderItem}
        keyExtractor={(item, index) => `prep-${index}`}
      />

      <Button title="Finished" onPress={markItemsAsFinished} />

      <Text style={styles.header}>Finished Items</Text>
      <FlatList
        data={prepList.filter(p => p.status === 'finished')}
        renderItem={({ item }) => <Text style={styles.itemText}>{item.name}</Text>}
        keyExtractor={(item, index) => `finished-${index}`}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
};