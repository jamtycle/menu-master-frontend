import { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import axios from "axios";

const RecipeDetails = ({ route, navigation }) => {
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const recipe = route.params?.recipe;

        if (!recipe) return;
        setRecipe(recipe);

        // ingredient/65f8954489e6e77ac7fb1027?id=65f89bf889e6e77ac7fb1039
        axios
            .get(
                "http://170.187.155.55:27041/ingredient/65f8954489e6e77ac7fb1027"
            )
            .then((res) => setIngredients(res.data.data));
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
                    <View key={index} style={styles.ingredient_container}>
                        <Text style={styles.text}>
                            {
                                ingredients.find(
                                    (i) => i._id === ingredient.ingredient_id
                                )?.name
                            }
                        </Text>
                        <Text style={styles.text}>
                            {ingredient.quantity +
                                "  " +
                                ingredient.measure_unit}
                        </Text>
                    </View>
                ))}
                <Text style={styles.subtitle}>Steps:</Text>
                {recipe.steps.map((step, index) => (
                    <Text key={index} style={styles.text}>
                        {index + 1}. {step}
                    </Text>
                ))}
                <Button title="Back" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    );
};

const styles = {
    ingredient_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
    },
    card: {
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#444",
        marginTop: 15,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
        lineHeight: 24,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
};

export default RecipeDetails;
