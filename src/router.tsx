import React, { FC, useState, useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthContext from './contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListScreen from "./components/screens/blogListScreen";
import LoginScreen from "./components/screens/logInScreen";

const Stack = createNativeStackNavigator()

const Router: FC<any> = () => {
    const { token, setToken } = useContext(AuthContext)

    useEffect(() => {
         checkRefreshStatus()
    }, [token])

    const checkRefreshStatus = async () => {
        const storageTkn = await AsyncStorage.getItem('token')
        if(storageTkn){
            setToken(storageTkn)
        }

    }


    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}
            >
                {token  ?
                    (
                        <>
                            <Stack.Screen name="HomePageScreen" component={ListScreen}></Stack.Screen>
                        </>
                    ) :
                    (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>

                        </>
                    )
                }

            </Stack.Navigator>
        </>
    )
}

export default Router
