import {Text,SafeAreaView,View,StyleSheet,ScrollView,ActivityIndicator,Image,Pressable} from 'react-native'
import React, { FC,useState,useEffect,useCallback,useContext } from "react";
import { GetApiCall } from "../../services/SecureApiCalls";
import EndPoints from "../../constants/EndPoints"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRoute, useNavigation } from '@react-navigation/core';
import ContextualActionBar from '../elements/ContextualActionBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../../contexts/AuthContext";


const ListScreen:FC<any>=()=>{
    const {token,setToken} = useContext(AuthContext)
    const navigation = useNavigation()
    const [blog, setBlog] = useState([])
    const [cabIsOpen, setCabIsOpen] = useState(false)
    const [selectedItemName, setSelectedItemName] = useState('');
    const [selectedItemId,setSelectedItemId]=useState()

    const logOut = async ()=>{
        await AsyncStorage.clear()
        setToken('')
    }

    // const openHeader = useCallback((item) => {
    //     setSelectedItemName(item.title)
    //     setSelectedItemId(item.id)
    //     setCabIsOpen(!cabIsOpen)
    // }, [cabIsOpen])

    // const closeHeader = useCallback(() => {
    //     setCabIsOpen(false);
    //     setSelectedItemName('');
    //     navigation.setOptions({headerShown:false})
    // }, []);

    useEffect(()=>{
            fetchBlogs()
    },[blog])

    // useEffect(() => {
    //     if (cabIsOpen) {
    //         navigation.setOptions({
    //             headerShown:true,
    //             header: (props: any) => (<ContextualActionBar {...props} title={selectedItemName}
    //                                                           close={closeHeader} selectedItemId={selectedItemId} />),
    //
    //         })
    //     } else {
    //         navigation.setOptions({header: undefined});
    //     }
    // }, [cabIsOpen,selectedItemName])
    const fetchBlogs=async ()=>{
        try {
            const response = await GetApiCall(EndPoints.BLOGS, { organization_id: 12},token)
            setBlog(response)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable style={{position: 'absolute', right: 15,top:10 }}  onPress={logOut}>
                        <Icon name="sign-out-alt" size={35} color="#592942"/>
                    </Pressable>
                    <View style={{marginTop:30}}>
                        <Text style={{fontSize: 40,fontWeight: '600',color:'#592942'}}>
                            BLOG
                        </Text>
                    </View>
                </View>

                <View style={{zIndex:1,position:'absolute',bottom:40,right:10,}}>
                    <Pressable
                        onPress={()=>navigation.navigate('Blog Post')}
                    >
                        <Icon name="plus-circle" size={70} color="#F0A500" ></Icon>
                    </Pressable>
                </View>
                <ScrollView style={styles.container}>
                    {
                        blog.length ? blog.map((item: any, index: number) =>
                                <View key={index} style={{height:150,marginTop:20,position: 'relative', zIndex: 0,flexDirection: 'row'}}>
                                    <View style={{margin:10}}>
                                        <Image
                                                source={{
                                                    uri: 'https://images.unsplash.com/photo-1638813060437-c356a4f90155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                                                }}
                                                style={{height:120,width:120,borderRadius:8}}
                                            >
                                        </Image>
                                    </View>
                                    <View style={{flexDirection: 'row',marginLeft:12,marginTop:20,flex:1}}>
                                        <Icon name='dot-circle' size={29} color="#F0A500"></Icon>
                                        <Text style={{
                                            marginLeft:8,
                                            fontSize: 22,
                                            color: 'white',
                                            fontWeight: '500'
                                        }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </View>
                            ) :
                            <View style={styles.inputView}>
                                <ActivityIndicator size="large" color="#F0A500"/>
                            </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    inputView:{
        marginVertical: 5,
        width: '100%'
    },
    container: {
        backgroundColor: '#592942',
        height: '100%',
    },
    screenHeadline: {
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 4,
        marginBottom: 25
    },
    cardTitleContainer: {
        flexDirection: "row",
        alignItems: 'right',
        backgroundColor: '#F0A500',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 5,
    },
    blogContainer:{
        backgroundColor:'white'
    },
    header:{
        backgroundColor:'white',
        height:150,
        alignItems: 'center',
        justifyContent:'center',
        borderBottomStartRadius:30,
        borderBottomEndRadius:30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginBottom: 3
    }
})

export default ListScreen
