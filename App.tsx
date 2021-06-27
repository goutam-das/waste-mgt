import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import routes from './routes';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
enableScreens();
export default function App() {
    const [initialRoute] = useState('Dashboard');
    const [fontLoaded] = useFonts({
        ...Ionicons.font
    });
    useEffect(() => {
        SplashScreen.preventAutoHideAsync().then().catch();
    }, []);

    if (!fontLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync().then();
    }
    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: '#fff'
                }
            }}
        >
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{
                    animationEnabled: false
                }}
            >
                {routes.map((r, i) => (
                    <Stack.Screen
                        key={i}
                        name={r.title}
                        component={r.component}
                        options={r.options}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
