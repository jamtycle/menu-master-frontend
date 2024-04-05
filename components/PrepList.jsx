import { useState, useEffect } from "react";
import { Text, View, Button, Alert, FlatList } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import CheckBox from "react-native-check-box";
import axios from "axios";
import Theme from "../styles/colors";

export default function PrepList({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [prepList, setPrepList] = useState([]);
    const [finishedItems, setFinishedItems] = useState([]);
    const [selectedRecipeValue, setSelectedRecipeValue] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get("http://170.187.155.55:27041/recipe").then((res) => {
            setRecipes(res.data.data);
        });
    }, []);

    const onItemAdd = async () => {
        if (!selectedRecipeValue) {
            Alert.alert("Please select a recipe to add");
            return;
        }

        const selectedRecipe = recipes.find(
            (r) => r._id === selectedRecipeValue
        );

        if (!selectedRecipe) return;
        setPrepList([...prepList, selectedRecipe]);
    };

    const handleSelectItem = (index) => {
        const selected = new Set([...selectedItems, index]);
        if (selectedItems.includes(index)) {
            selected.delete(index);
        }
        setSelectedItems(Array.from(selected));
    };

    const markItemsAsFinished = async () => {
        const checkedItems = prepList.filter((_, index) =>
            selectedItems.includes(index)
        );
        const updatedPrepList = prepList.filter(
            (_, index) => !selectedItems.includes(index)
        );

        setSelectedItems([]);
        setPrepList(updatedPrepList);
        setFinishedItems([...finishedItems, ...checkedItems]);
    };

    const showRecipeCard = (recipeName) => {
        const recipe = recipes.find((r) => r.name === recipeName);
        if (recipe) {
            navigation.navigate("RecipeDetails", { recipe });
        } else {
            Alert.alert("Error", "Recipe not found");
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.listItem}>
            <CheckBox
                isChecked={selectedItems.includes(index)}
                onClick={() => handleSelectItem(index)}
            />
            <Text style={styles.itemText}>{item.name}</Text>
            <Button
                title="See Recipe"
                onPress={() => showRecipeCard(item.name)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Prep List</Text>

            <SelectList
                setSelected={setSelectedRecipeValue}
                data={recipes.map((recipe, i) => ({
                    index: i,
                    key: recipe._id,
                    value: recipe.name,
                }))}
                placeholder="Select a Recipe"
            />

            <Button title="Add Item" onPress={onItemAdd} />

            <FlatList
                data={prepList}
                renderItem={({ item, index }) => renderItem({ item, index })}
                keyExtractor={(item, index) => `prep-${index}`}
            />

            <Button title="Finished" onPress={markItemsAsFinished} />

            <Text style={styles.header}>Finished Items</Text>
            <FlatList
                data={finishedItems}
                renderItem={({ item }) => (
                    <Text style={styles.itemText}>{item.name}</Text>
                )}
                keyExtractor={(item, index) => `finished-${index}`}
            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginVertical: 8,
        backgroundColor: Theme.primary,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
    },
};
