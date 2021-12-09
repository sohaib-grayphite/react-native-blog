import React from 'react'
import {Button, Text, TextInput, View} from 'react-native'
import {act, cleanup, fireEvent, render, waitFor} from '@testing-library/react-native'
import LoginScreen from "../../src/components/screens/logInScreen";
import {AuthProvider} from "../../src/contexts/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import {Alert} from 'react-native'
jest.useFakeTimers()

describe('login Component ',()=>{
    afterEach(() => cleanup())
    it('render login component successfully',async()=>{
        fetch = jest.fn().mockImplementationOnce(()=>{
            return new Promise((resolve => {
                resolve(
                    {
                        ok:true,
                        json:()=>{
                            return{
                                token:'1212111111111111'
                            }
                        }
                    }
                )
            }))
        })
        jest.spyOn(Alert,'alert')

        const  data = await render(
            <>
                <NavigationContainer>
                    <AuthProvider>
                        <LoginScreen/>
                    </AuthProvider>
                </NavigationContainer>
            </>
        )
        data.debug()
        await waitFor(()=>{
            expect(data.getByPlaceholderText('Username')).toBeTruthy()
        })
        const userName = data.getByPlaceholderText('Username')
        act(async ()=>{
           await fireEvent.changeText(userName,'testname')
        })
        await waitFor(()=>{
            expect(userName.props.value).toBe('testname')
        })
        const password = data.getByPlaceholderText('Password')
        act(async()=>{
            await fireEvent.changeText(password,'testPassword')
        })
        await waitFor(()=>{
            expect(password.props.value).toBe('testPassword')
        })
        const loginButton = data.getByText('Login')
        act(async ()=>{
           await fireEvent.press(loginButton)
        })
    },10000)
    it('render login component in error in api scenario',async()=>{
        fetch = jest.fn().mockImplementationOnce(()=>{
            return new Promise((reject => {
                reject(
                    {
                        json:()=>{
                            return{
                                message:'could not login'
                            }
                        }
                    }
                )
            }))
        })
        jest.spyOn(Alert,'alert')

        const  data = await render(
            <>
                <NavigationContainer>
                    <AuthProvider>
                        <LoginScreen/>
                    </AuthProvider>
                </NavigationContainer>
            </>
        )
        data.debug()
        await waitFor(()=>{
            expect(data.getByPlaceholderText('Username')).toBeTruthy()
        })
        const userName = data.getByPlaceholderText('Username')
        act(async ()=>{
            await fireEvent.changeText(userName,'testname')
        })
        await waitFor(()=>{
            expect(userName.props.value).toBe('testname')
        })
        const password = data.getByPlaceholderText('Password')
        act(async()=>{
            await fireEvent.changeText(password,'testPassword')
        })
        await waitFor(()=>{
            expect(password.props.value).toBe('testPassword')
        })
        const loginButton = data.getByText('Login')
        act(async ()=>{
            await fireEvent.press(loginButton)
        })
        await waitFor(()=>{
            expect(Alert.alert).toHaveBeenCalledWith('\"could not login\"')
        })
    },10000)

})
