import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Profile extends Component {
    
    render() {
        return (
                <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <View style={styles.body}>
                <View style={styles.bodyContent}>
                <TouchableOpacity style={styles.txtContainer}>
                <Text style={styles.name}>Henry Peters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.txtContainer}>
                <Text style={styles.info}>Computer Science, 2020</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonContainer}>
                <Text>All Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                <Text>My Events</Text>
                </TouchableOpacity>
                </View>
                </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 header:{
                                 backgroundColor: "#4285F4",
                                 height:200,
                                 },
                                 avatar: {
                                 width: 130,
                                 height: 130,
                                 borderRadius: 63,
                                 borderWidth: 4,
                                 borderColor: "white",
                                 marginBottom:10,
                                 alignSelf:'center',
                                 position: 'absolute',
                                 marginTop:130
                                 },
                                 name:{
                                 fontSize:22,
                                 color:"#FFFFFF",
                                 fontWeight:'600',
                                 },
                                 body:{
                                 marginTop:40,
                                 },
                                 bodyContent: {
                                 flex: 1,
                                 alignItems: 'center',
                                 padding:30,
                                 },
                                 name:{
                                 fontSize:28,
                                 color: "#696969",
                                 fontWeight: "600"
                                 },
                                 info:{
                                 fontSize:16,
                                 color: "#4285F4",
                                 marginTop:10
                                 },
                                 description:{
                                 fontSize:16,
                                 color: "#696969",
                                 marginTop:10,
                                 textAlign: 'center'
                                 },
                                 txtContainer: {
                                 marginTop:10,
                                 height:45,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:20,
                                 width:250,
                                 borderRadius:30,
                                 },
                                 buttonContainer: {
                                 marginTop:10,
                                 height:45,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:20,
                                 width:250,
                                 borderRadius:30,
                                 backgroundColor: "#4285F4",
                                 },
                                 });
