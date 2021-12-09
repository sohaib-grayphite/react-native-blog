import React, { FC, useState, useEffect, useContext } from "react";
import { ScrollView, SafeAreaView, StyleSheet, ToastAndroid, Alert, Image, Platform, Pressable, Text } from 'react-native'
import { LoginApiCall } from '../../services/AuthApiCalls'
import EndPoints from "../../constants/EndPoints";
import { useNavigation } from '@react-navigation/native';
import InputTextComponent from "../elements/InputTextComponent";
import ButtonComponent from "../elements/ButtonComponent";
import AuthContext from "../../contexts/AuthContext";

const LoginScreen: FC<any> = () => {
    const navigation = useNavigation()

    const { setToken } = useContext(AuthContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [btnLoading, setBtnLoading] = useState<boolean>(false)



    const login = async () => {

        if (!username) {
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity('Fill username Please', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return
        }
        if (!password) {
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity('Fill password Please', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return
        }
        try {
            setBtnLoading(true)
            const response = await LoginApiCall(EndPoints.LOGIN, {
                username: username,
                password: password,
                organization_id:12
            }, {}, 'POST')
            if (response?.token) {
                setBtnLoading(false)
                console.log(response.token)
                setToken(response.token)
            }
        } catch (err) {
            setBtnLoading(false)
            console.error('err', err)
            Alert.alert(JSON.stringify(err))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <InputTextComponent
                    value={username}
                    onChange={setUsername}
                    placeholder="Username"
                />
                <InputTextComponent
                    value={password}
                    onChange={setPassword}
                    isProtected={true}
                    placeholder="Password"
                />
                <ButtonComponent inverse={true} title="Login" onPress={login} loading={btnLoading} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#592942',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },


})

export default LoginScreen;
