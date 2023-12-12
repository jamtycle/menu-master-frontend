import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import axios from 'axios';

const RecipeDetails = ({ route, navigation }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const recipeId = route.params?.recipeId;

      try {
        const response = await axios.get(`http://170.187.155.55:27041/recipes/${recipeId}`);
        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe details', error);
      }
    };

    fetchRecipeDetails();
  }, [route.params]);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>No recipe data available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>{ingredient}</Text>
        ))}
        <Text style={styles.subtitle}>Steps:</Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={styles.text}>{index + 1}. {step}</Text>
        ))}
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  card: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    lineHeight: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
};

export default RecipeDetails;