import React, { FC, useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/contexts/AuthContext';
import Router from "./src/router";
import SplashScreen from 'react-native-splash-screen'






const App:FC<any> = () => {

    useEffect(()=>{
        SplashScreen.hide()
    })

  return (
        <NavigationContainer>
            <AuthProvider>
                    <Router/>
            </AuthProvider>
        </NavigationContainer>
  )
};


export default App;
