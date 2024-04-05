import { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Login from "./components/Login";
import PrepList from "./components/PrepList";
import InventoryManagement from "./components/InventoryManagement";
import OtherRolesScreen from "./components/OtherRolesScreen";
import RecipeDetails from "./components/RecipeDetails";
import Theme from "./styles/colors";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        Urbanist: require("./assets/fonts/Urbanist.ttf"),
        UrbanistBold: require("./assets/fonts/Urbanist-Bold.ttf"),
        UrbanistBlack: require("./assets/fonts/Urbanist-Black.ttf"),
    });

    const [userRole, setUserRole] = useState(null);
    const navigationRef = useRef();

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) await SplashScreen.hideAsync();
    }, [fontsLoaded, fontError]);

    const loginAction = () => {
        if (!userRole || !navigationRef.current) return;

        switch (userRole) {
            case "chef":
                navigationRef.current.navigate("PrepList");
                break;
            case "manager":
                navigationRef.current.navigate("InventoryManagement");
                break;
            default:
                navigationRef.current.navigate("OtherRoles");
                break;
        }
    };

    useEffect(() => {
        if (!userRole) return;
        loginAction();
    }, []);

    useEffect(() => loginAction(), [userRole, navigationRef]);

    const onLogin = (role) => {
        // console.log(role);
        setUserRole(role);
    };

    if (fontError) console.error(fontError);
    if (!fontsLoaded && !fontError) return null;

    return (        
        <NavigationContainer ref={navigationRef}>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                    screenListeners={({ route }) => {
                        if (route.name === "Login") setUserRole(null);
                        // console.log(route);
                    }}
                >
                    <Stack.Screen name="Login">
                        {(props) => <Login {...props} onLoginProp={onLogin} />}
                    </Stack.Screen>
                    <Stack.Screen name="PrepList" component={PrepList} />
                    <Stack.Screen
                        name="RecipeDetails"
                        component={RecipeDetails}
                    />
                    <Stack.Screen
                        name="InventoryManagement"
                        component={InventoryManagement}
                    />
                    <Stack.Screen
                        name="OtherRoles"
                        component={OtherRolesScreen}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.primary,
    },
});
