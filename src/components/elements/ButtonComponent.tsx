import React, { FC } from 'react';
import { Pressable, View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';

type ButtonComponent = {
    title: string,
    onPress: any,
    loading?: boolean,
    disabled?: boolean,
    inverse?: boolean,
}

const ButtonComponent: FC<ButtonComponent> = ({ title, onPress, loading, disabled, inverse }) => {
    return (
        <View style={styles.inputView}>
            <Pressable
                style={inverse ? styles.buttonInverse :styles.button}
                onPress={onPress}
            >
            {
                loading ? <ActivityIndicator style={{paddingTop: 4}} color={inverse ? '#fff' : '#fff'}/> : <Text style={inverse ? styles.buttonTitleInverse : styles.buttonTitle}>{title}</Text>
            }

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        marginVertical: 5,
        width: Dimensions.get('window').width / 2
    },
    button: {
        borderRadius: 10,
        height: 60,
        padding: 5,
        backgroundColor: '#FOA500'

    },
    buttonTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    buttonInverse: {
        borderRadius: 20,
        height: 40,
        padding: 5,
        backgroundColor: '#F0A500'

    },
    buttonTitleInverse: {
        fontSize: 20,
        fontWeight: '600',
        color: '#F4F4F4',
        textAlign: 'center',
        textTransform: 'uppercase'
    }

});


export default ButtonComponent
