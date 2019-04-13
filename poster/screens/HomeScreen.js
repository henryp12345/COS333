import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
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
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search events"
          value={this.state.search}
        />

<View style={{ flexDirection:"row", marginTop: 10, marginHorizontal: 5 }}>
    <Button
  icon={{name: 'ios-american-football', type: 'ionicon', buttonStyle: styles.someButtonStyle, color:'white' }}
  buttonStyle={{height: 60, width: 60, borderRadius: 30, marginHorizontal: 10}}
  />
<Button
  icon={{name: 'shopping-cart', type: 'weloveiconfonts', buttonStyle: styles.someButtonStyle, color:'white' }}
  buttonStyle={{height: 60, width: 60, borderRadius: 30, marginHorizontal: 10}}
  />
  <Button
  icon={{name: 'movie', type: 'material', buttonStyle: styles.someButtonStyle, color:'white' }}
  buttonStyle={{height: 60, width: 60, borderRadius: 30, marginHorizontal: 10}}
  />
    <Button
  icon={{name: 'car', type: 'font-awesome', buttonStyle: styles.someButtonStyle, color:'white' }}
  buttonStyle={{height: 60, width: 60, borderRadius: 30, marginHorizontal: 10}}
  />
    <Button
  icon={{name: 'book', type: 'font-awesome', buttonStyle: styles.someButtonStyle, color:'white' }}
  buttonStyle={{height: 60, width: 60, borderRadius: 30, marginHorizontal: 10}}
  />

  </View>
  <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation" })}
        >
          <Text style={styles.link}>Temporary button to navigate to event details page</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            <Text style={styles.textStyle}>{item.title}</Text>
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
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    padding: 10,
  },

});