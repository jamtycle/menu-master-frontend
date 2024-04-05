import { useEffect, useState } from "react";
import {
    Text,
    TextInput,
    Alert,
    StyleSheet,
    View,
    TouchableHighlight,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Theme from "../styles/colors";
import { loginUser } from "../api/apiUser";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ onLoginProp }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => { 
        setUsername("");
        setPassword("");
    }, []);

    const onLogin = () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert("Error", "Please enter both username and password");
            return;
        }

        loginUser(username.trim(), password.trim())
            .then((res) => {
                const data = res.data;
                if (!data.data) {
                    Alert.alert(data.message);
                    return;
                }
                // console.log(data.data);
                // AsyncStorage.setItem(
                //     "credentials",
                //     JSON.stringify({
                //         username: username.trim(),
                //         password: password.trim(),
                //     })
                // );
                onLoginProp(data.data.user_type);
            })
            .catch((ex) => console.error(ex));
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Theme.baseTheme.accent, Theme.baseTheme.primary]}
                style={styles.background}
            >
                <Text style={styles.title}>MENU{"\n"}MASTER</Text>

                <View style={styles.cardBase}>
                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle}>Hi! Welcome back</Text>
                        <Text style={styles.text}>Sign in to your account</Text>
                    </View>

                    <TextInput
                        value={username}
                        style={styles.input}
                        placeholder="Enter username"
                        onChangeText={(val) => setUsername(val?.toLocaleLowerCase())}
                        placeholderTextColor={Theme.whites["input-placeholder"]}
                    />
                    <TextInput
                        value={password}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Enter password"
                        onChangeText={setPassword}
                        placeholderTextColor={Theme.whites["input-placeholder"]}
                    />

                    <TouchableHighlight
                        onPress={onLogin}
                        // color={Theme.baseTheme.primary}
                        style={styles.signInButton}
                    >
                        <Text style={styles.signInButtonText}>Sign in</Text>
                    </TouchableHighlight>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
    },
    title: {
        color: Theme.white,
        fontSize: 45,
        textAlign: "center",
        fontFamily: "UrbanistBlack",
        lineHeight: 45,
        paddingBottom: 40,
    },
    subTitleContainer: {
        gap: 8,
        marginHorizontal: 25,
        marginBottom: 18,
    },
    subTitle: {
        fontSize: 18,
        fontFamily: "UrbanistBold",
        color: Theme.black,
    },
    text: {
        fontSize: 13,
        fontFamily: "Urbanist",
        color: Theme.whites["input-placeholder"],
    },
    cardBase: {
        flex: 1,
        marginHorizontal: 20,
        borderRadius: 35,
        backgroundColor: Theme.white,
        justifyContent: "center",
        padding: 30,
        maxHeight: 400,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: Theme.whites["input-gray"],
        padding: 10,
        paddingLeft: 20,
        backgroundColor: Theme.white,
        borderRadius: 100,
        fontSize: 16,
        fontFamily: "Urbanist",
    },
    picker: {
        height: 50,
        margin: 12,
        backgroundColor: Theme.white,
        borderWidth: 1,
        borderColor: Theme.whites["input-gray"],
        fontFamily: "Urbanist",
    },
    signInButton: {
        marginHorizontal: 12,
        marginTop: 5,
        paddingVertical: 10,
        backgroundColor: Theme.baseTheme.primary,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Theme.white,
    },
    signInButtonText: {
        color: Theme.white,
        textAlign: "center",
        fontSize: 18,
        fontFamily: "UrbanistBold",
    },
});

export default Login;
