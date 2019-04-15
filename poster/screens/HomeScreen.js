import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'native-base';
import { LinearGradient } from 'expo';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch('https://posterapp333.herokuapp.com/event')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    var size = 100;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 26}}>Browse Events</Text>
        <SearchBar
          round
          containerStyle={{ width: '100%', backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, }}
          inputContainerStyle={{ backgroundColor: 'white'}}
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search"
          value={this.state.search}
        />
<ScrollView>
<Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 18}}>Popular Categories</Text>
<View style={{ flexDirection:"row", marginTop: 10, marginHorizontal: 5, justifyContent: 'space-between' }}>
<TouchableOpacity 
   onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase() : ''.toUpperCase();
      const textData = "sports".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
   <LinearGradient
  colors={['#f42e78', '#c17afc']}
   height={100}
    width={120}
   style={{
    borderRadius: 5,
     alignItems: 'flex-start',
     justifyContent: 'center',
     padding: 20
          }}>
          <Icon
  name='ios-basketball'
  type='ionicon'
  color='#ffffff'
  size = {30}
/>
<Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'left'
            }}>
            Sports
          </Text>
  </LinearGradient>
        
</TouchableOpacity>

<TouchableOpacity 
   onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase() : ''.toUpperCase();
      const textData = "study".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
   <LinearGradient
  colors={['#fec180', '#ff8993']}
   height={100}
    width={120}
   style={{
     borderRadius: 5,
     alignItems: 'flex-start',
     justifyContent: 'center',
     padding: 20
          }}>
          <Icon
  name='book'
  type='font-awesome'
  color='#ffffff'
  size = {30}
/> 
<Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'left'
            }}>
            Study
          </Text>
  </LinearGradient>
        
</TouchableOpacity>

<TouchableOpacity 
   onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase() : ''.toUpperCase();
      const textData = "gaming".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
   <LinearGradient
  colors={['#6681ea', '#7e43aa']}
   height={100}
    width={120}
   style={{
     borderRadius: 5,
     alignItems: 'flex-start',
     justifyContent: 'center',
     padding: 20
          }}>
          <Icon
  name='logo-game-controller-b'
  type='ionicon'
  color='#ffffff'
  size = {30}
/> 
 <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'left'
            }}>
            Gaming
          </Text>
  </LinearGradient>
       
</TouchableOpacity>
</View>

<View style={{ paddingBottom: 20, flexDirection:"row", marginTop: 10, marginHorizontal: 5, justifyContent: 'space-between' }}>
<TouchableOpacity 
   onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase() : ''.toUpperCase();
      const textData = "transport".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
   <LinearGradient
  colors={['#f3dcfb', '#679fe4']}
   height={100}
    width={120}
   style={{
     borderRadius: 5,
     alignItems: 'flex-start',
     justifyContent: 'center',
     padding: 20
          }}>
          <Icon
  name='car'
  type='font-awesome'
  color='#ffffff'
  size = {30}
/> 
<Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'left'
            }}>
            Transport
          </Text>
  </LinearGradient>
        
</TouchableOpacity>

<TouchableOpacity 
   onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase() : ''.toUpperCase();
      const textData = "shopping".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
   <LinearGradient
  colors={['#80f9b7', '#00A8C5']}
   height={100}
    width={120}
   style={{
     borderRadius: 5,
     alignItems: 'flex-start',
     justifyContent: 'center',
     padding: 20
          }}>
          <Icon
  name='shopping-cart'
  type='weloveiconfonts'
  color='#ffffff'
  size = {30}
/> 
<Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'left'
            }}>
            Bulk Orders
          </Text>
  </LinearGradient>
        
</TouchableOpacity>

<TouchableOpacity 
   onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase() : ''.toUpperCase();
      const textData = "campus activity".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
   <LinearGradient
  colors={['#ff839d', '#f50b9a']}
   height={100}
    width={120}
   style={{
     borderRadius: 5,
     alignItems: 'flex-start',
     justifyContent: 'center',
     padding: 20
          }}>
          <Icon
  name='comments'
  type='font-awesome'
  color='#ffffff'
  size = {30}
/> 
<Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 14,
              color: '#ffffff',
              textAlign: 'left'
            }}>
            Campus Events
          </Text>
  </LinearGradient>
        
</TouchableOpacity>
</View>

<Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 18}}>Happenings</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
          <Card>
            <Text style={styles.textStyle}>{item.title}</Text>
            <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation" , eventId: item.id})}>
          <Text style={styles.textStyle}>Go to event details page</Text>
        </TouchableOpacity>
            </Card>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    margin: 20,
    margin: 15,
    textAlign: 'center',
  },
  TextViewStyle:
    {
       borderWidth: 1, 
       borderRadius: 10,
       borderColor: '#E91E63',
       width: '80%',
       padding: 5,
       backgroundColor: '#FFEB3B'
 
    },

  textStyle: {
    padding: 10,
  },

});
