import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class DiscoverScreen extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 24}}>Discover</Text>  

      <View style={{ flexDirection:"row", marginTop: 10, marginHorizontal: 5, justifyContent: 'space-between' }}>
<Button
title="Today"

  buttonStyle={{height: 110, width: 110, borderRadius: 0, marginHorizontal: 5, backgroundColor: '#517fa4'}}
  />

<Button
title="Tomorrow"

  buttonStyle={{height: 110, width: 110, borderRadius: 0, marginHorizontal: 5, backgroundColor: '#517fa4'}}
  />
<Button
title="This Weekend"

  buttonStyle={{height: 110, width: 110, borderRadius: 0, marginHorizontal: 5, backgroundColor: '#517fa4'}}
  />
</View>
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 24}}>Latest</Text>  
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 24}}>Top Picks For You</Text>  

      </View>

    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    margin: 15,
    textAlign: 'center',
 
  },

  textStyle: {
    padding: 10,
    alignItems: 'flex-start',
    padding:30,
  },

});