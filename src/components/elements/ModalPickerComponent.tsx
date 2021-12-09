import React, { FC } from "react";
import { View, StyleSheet, Dimensions } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

type itemOption = {
    name: string,
    id: number,
    domain:string
}

type ModalPickerComponent = {
    itemList: Array<itemOption>,
    onValueChange?: any,
    initValue?:string,
    keyExtractor?:any,
    labelExtractor?:any

}

const ModalPickerComponent:FC<ModalPickerComponent> = ({itemList,onValueChange,initValue,keyExtractor,labelExtractor})=>{
    return(
        <View style={styles.inputView}>
            <ModalSelector
                initValue={initValue}
                data={itemList}
                onChange={onValueChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        borderRadius: 10,
        marginVertical: 5,
        width: Dimensions.get('window').width - 10,

    },
    input: {
        height: 40,
        padding: 10,
    },

});

export default ModalPickerComponent
