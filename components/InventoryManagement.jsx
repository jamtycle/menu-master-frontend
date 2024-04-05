/* eslint-disable react-native/no-color-literals */
import { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    TextInput,
    StyleSheet,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { StyleSheet } from "react-native-web";

export default function InventoryManagement() {
    const [inventory, setInventory] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [editQuantity, setEditQuantity] = useState("");

    const initializeData = async () => {
        try {
            const ingredient_response = await axios.get(
                "http://170.187.155.55:27041/ingredient/65f8954489e6e77ac7fb1027"
            );
            const inventory_response = await axios.get(
                "http://170.187.155.55:27041/inventory"
            );
            for (let j = 0; j < ingredient_response.data.data.length; j++) {
                ingredient_response.data.data[j].quantity = 0;
            }

            for (let i = 0; i < inventory_response.data.data.length; i++) {
                for (let j = 0; j < ingredient_response.data.data.length; j++) {
                    if (
                        inventory_response.data.data[i].ingredient_id ===
                        ingredient_response.data.data[j]._id
                    ) {
                        ingredient_response.data.data[j].quantity =
                            inventory_response.data.data[i].stock || 0;
                    }
                }
            }
            // console.log(ingredient_response.data.data);
            // console.log(inventory_response.data.data);
            setInventory(ingredient_response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch inventory data", error);
        }
    };

    useEffect(() => {
        initializeData();
    }, []);

    const updateInventoryItem = (itemId) => {
        const q = parseFloat(editQuantity);
        if (isNaN(q)) return;
        if (q === 0) return;
        // console.log("Updating inventory item", itemId, q);

        axios
            .put("http://170.187.155.55:27041/inventory", {
                ingredient_id: itemId,
                stock: parseFloat(editQuantity, 10),
            })
            .then((res) => {
                if (!res.data) return;
                // console.log(res.data);
                if (!res.data.data) return;

                const ninv = inventory.map((item) => {
                    if (item._id !== itemId) return item;
                    return {
                        ...item,
                        quantity: item.quantity + parseFloat(editQuantity, 10),
                    };
                });

                setInventory(ninv);
                setEditItemId(null);
                setEditQuantity("");
            })
            .catch((ex) => console.error(ex));
    };

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            {editItemId === item._id ? (
                <>
                    <Text style={styles.itemQuantity}>{`${Number(
                        item.quantity
                    ).toFixed(2)}`}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => {
                            setEditQuantity(val);
                        }}
                        value={editQuantity}
                        keyboardType="decimal-pad"
                        // placeholder="Enter new quantity"
                        // onBlur={() => setEditItemId(null)}
                    />
                    <Button
                        title="+/-"
                        onPress={() => {
                            const q = parseFloat(editQuantity);
                            if (isNaN(q)) return;
                            setEditQuantity(
                                (parseFloat(editQuantity) * -1).toFixed(2)
                            );
                        }}
                    />
                </>
            ) : (
                <Text style={styles.itemQuantity}>{`Quantity: ${Number(
                    item.quantity
                ).toFixed(2)}`}</Text>
            )}
            {editItemId === item._id ? (
                <Button
                    title={
                        editQuantity && !editQuantity.startsWith("0")
                            ? "Add"
                            : "Cancel"
                    }
                    color={
                        editQuantity && !editQuantity.startsWith("0")
                            ? "green"
                            : "red"
                    }
                    onPress={() => {
                        if (editQuantity && !editQuantity.startsWith("0"))
                            updateInventoryItem(item._id);
                        else setEditItemId(null);
                    }}
                />
            ) : (
                <Button
                    title="Edit"
                    onPress={() => {
                        setEditItemId(item._id);
                        setEditQuantity("0");
                    }}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inventory Management</Text>
            <FlatList
                data={inventory}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listItem: {
        backgroundColor: "#f7f7f7",
        padding: 10,
        marginVertical: 4,
        borderRadius: 5,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemName: {
        fontSize: 18,
        width: "50%",
    },
    itemQuantity: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        width: "auto",
    },
});
