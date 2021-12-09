import React from 'react'
import {act, cleanup, fireEvent, render, waitFor} from '@testing-library/react-native'
import {AuthProvider} from "../../src/contexts/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import ListScreen from "../../src/components/screens/blogListScreen"

jest.useFakeTimers()
describe("blog list screen",()=>{
    const blogResponse= [
        {
            "id": 1,
            "title": "test blog",

        },
        {
            "id": 1,
            "title": "test blog 2",

        },
    ]

    afterEach(() => cleanup())
    it('render blog list component successfully',async ()=>{
        fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    status: 200,
                    json: () => {
                        return blogResponse
                    },
                });
            });
        });

        const  data = await render(
            <>
                <NavigationContainer>
                    <AuthProvider>
                        <ListScreen/>
                    </AuthProvider>
                </NavigationContainer>
            </>
        )
        data.debug()
        await waitFor(()=>{
            expect(data.getByText('BLOG')).toBeTruthy()
        })
        await waitFor(()=>{
            expect(data.getByText('test blog')).toBeTruthy()
        })
        await waitFor(()=>{
            expect(data.getByText('test blog 2')).toBeTruthy()
        })
    })
})
