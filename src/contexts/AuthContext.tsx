import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = React.createContext<any | null>('')

export const AuthProvider = (props: any) => {
    const [token, setToken] = useState<string>('')

    useEffect(() => {
        setTokenStorage()
    }, [token])

    const setTokenStorage = async () => {
        await AsyncStorage.setItem('token', token)
    }



    return (
        <AuthContext.Provider value={{token, setToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
