import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'native-base';

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
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 24}}>Browse Events</Text>
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

<Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 16}}>Popular Categories</Text>
<View style={{ flexDirection:"row", marginTop: 10, marginHorizontal: 5, justifyContent: 'space-between' }}>
<TouchableOpacity onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase : ''.toUpperCase();
      const textData = "sports".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
<Icon
  reverse
  name='ios-basketball'
  type='ionicon'
  color='#517fa4'
  size = {45}
/>
<Text style = {{textAlign: 'center'}}>Sports</Text>
</TouchableOpacity>
<TouchableOpacity onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase : ''.toUpperCase();
      const textData = "sports".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
<Icon
  reverse
  name='book'
  type='font-awesome'
  color='#517fa4'
  size = {45}
/> 
<Text style = {{textAlign: 'center'}}>Study Groups</Text>
</TouchableOpacity>
<TouchableOpacity onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase : ''.toUpperCase();
      const textData = "gaming".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
<Icon
  reverse
  name='logo-game-controller-b'
  type='ionicon'
  color='#517fa4'
  size = {45}
/> 
<Text style = {{textAlign: 'center'}}>Gaming</Text>
</TouchableOpacity>
</View>

<View style={{ flexDirection:"row", marginTop: 10, marginHorizontal: 5, justifyContent: 'space-between' }}>
<TouchableOpacity onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase : ''.toUpperCase();
      const textData = "transport".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
<Icon
  reverse
  name='car'
  type='font-awesome'
  color='#517fa4'
  size = {45}
/> 
<Text style = {{textAlign: 'center'}}>Transport</Text>
</TouchableOpacity>
<TouchableOpacity onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase : ''.toUpperCase();
      const textData = "shopping".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
<Icon
  reverse
  name='shopping-cart'
  type='weloveiconfonts'
  color='#517fa4'
  size = {45}
/> 
<Text style = {{textAlign: 'center'}}>Bulk Orders</Text>
</TouchableOpacity>
<TouchableOpacity onPress ={() => {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.tags ? item.tags.toUpperCase : ''.toUpperCase();
      const textData = "campus activity".toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: "",
    });
  }}>
<Icon
  reverse
  name='comments'
  type='font-awesome'
  color='#517fa4'
  size = {45}
/> 
<Text style = {{textAlign: 'center'}}>Campus Events</Text>
</TouchableOpacity>
</View>
  

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
          <Card>
            <Text style={styles.textStyle}>{item.title}</Text>
            <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation" })}
        >
          <Text style={styles.textStyle}>Go to event details page</Text>
        </TouchableOpacity>
            </Card>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#171F33',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    margin: 15,
    textAlign: 'center',
 
  },

  textStyle: {
    padding: 10,
  },

});
