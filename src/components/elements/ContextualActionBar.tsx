import React,{FC,useState,useContext} from 'react';
import {Appbar} from 'react-native-paper';
import {DeleteApiCall} from "../../services/SecureApiCalls";
import EndPoints from "../../constants/EndPoints";
import { useRoute, useNavigation } from '@react-navigation/core';
import {Alert} from 'react-native'
import AuthContext from "../../contexts/AuthContext";


const ContextualActionBar:FC<any> = (props) => {
    const token=useContext(AuthContext)

    const deleteBlog = async ()=>{
        try {
            const response = await DeleteApiCall(EndPoints.BLOGS, {
                id:props.selectedItemId
            },token )
            if (response) {
                console.log(response)
            }
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <Appbar.Header {...props} style={{width: '100%'}}>
            <Appbar.Action icon='close' onPress={props.close} />
            <Appbar.Content title={props.title} />
            <Appbar.Action icon='delete' onPress={deleteBlog} />
        </Appbar.Header>
    );
};
export default ContextualActionBar;
