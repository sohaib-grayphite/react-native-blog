import React,{FC,useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity,SafeAreaView,ScrollView,ToastAndroid,Platform,Alert} from 'react-native';
import InputTextComponent from "../elements/InputTextComponent";
import ButtonComponent from "../elements/ButtonComponent";
import EndPoints from "../../constants/EndPoints";
import {PostApiCall} from "../../services/publicApiCalls";




const PostScreen:FC<any>=()=> {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')


    const postBlog = async () => {
        if (!title) {
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity('Add title please', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return
        }
        if (!content) {
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity('Add content please', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return
        }


        try {
            const response = await PostApiCall(EndPoints.BLOGS, {
                title: title,
                content: content,
                location:6

            }, )
            if (response) {
                console.log(response)
            }
        } catch (err) {
            console.log(err)

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <InputTextComponent
                    value={title}
                    onChange={setTitle}
                    placeholder="title"
                />
                <InputTextComponent
                    value={content}
                    onChange={setContent}
                    placeholder="Content"
                    multiline={true}
                />
                <ButtonComponent inverse={true} title="Post" onPress={postBlog}  />
            </ScrollView>
        </SafeAreaView>
    );

}







const styles = StyleSheet.create({
    loginBtn: {
        width: '50%',
        backgroundColor: '#0482f7',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: 'grey',
    },

});

export default PostScreen
