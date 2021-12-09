import React, { FC, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions
} from 'react-native';

type InputField = {
    placeholder: string,
    isProtected?: boolean,
    value?: string,
    onChange?: any,
    dark?: boolean
    multiline?:boolean
}


const InputTextComponent: FC<InputField> = ({ placeholder, isProtected = false, value, onChange, dark = false,multiline }) => {

    return (
        <View style={styles.inputView}>
            <TextInput
                multiline={multiline}
                value={value}
                placeholder={placeholder}
                style={dark ? styles.inputBlack : styles.input}
                secureTextEntry={isProtected}
                autoCapitalize="none"
                onChangeText={text => onChange(text)}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        width: Dimensions.get('window').width - 10

    },
    input: {
        height: 40,
        padding: 10,
        color: '#5B5A62',
    },
    inputBlack: {
        height: 50,
        padding: 10,
        color: '#5B5A62'
    },

});
export default InputTextComponent
