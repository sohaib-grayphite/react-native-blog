import React, { FC, useContext } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import AuthContext from "../../contexts/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

interface IStatusBar {
    back?: boolean
}

const StatusBar: FC<IStatusBar> = ({ back }) => {
    const { setToken} = useContext(AuthContext)
    const navigation = useNavigation()

    const logout = async () => {
        await AsyncStorage.clear()
        setToken('')
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {back ? <Pressable onPress={() => goBack()}>
                <Icon name="arrow-left" size={35} />
            </Pressable> : <View />}
            <Pressable style={styles.logoutButton} onPress={() => logout()}>
                <Icon name="sign-out-alt" size={35}  />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginBottom: 3
    },
    logoutButton: {
        alignItems: 'flex-end',
        color: "#fff",
        borderRightColor: '#000',
        paddingVertical: 4,
        paddingHorizontal: 5
    }

});

export default StatusBar;
