import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography'
import { Card } from 'native-base';
import { LinearGradient } from 'expo';

export default class DiscoverScreen extends Component {
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
    return (
      <ScrollView>
      <View style={styles.viewStyle}>
<Text style={styles.customTitle}>Top Picks For You</Text>  
       <ScrollView horizontal={true}
       showsHorizontalScrollIndicator={false}> 
       
       <FlatList
       horizontal={true}
data={this.state.dataSource}
renderItem={({ item }) => (

    <TouchableOpacity>
    <LinearGradient
    colors={['#47e5bc', '#a2efdb']}
    height={260}
    width={240}
    style={{
     marginHorizontal: 5,
     borderRadius: 5,
     alignItems: 'flex-start',
     padding: 20
   }}>
   <Text style={styles.eventTitle}>{item.title}</Text>
  </LinearGradient>
  </TouchableOpacity>
)}
enableEmptySections={true}
style={{ marginTop: 5, marginBottom: 20}}
keyExtractor={(item, index) => index.toString()}
/>
        </ScrollView>

      <Text style={styles.customTitle}>Today</Text> 
       <ScrollView horizontal={true}
       showsHorizontalScrollIndicator={false}> 
       
       <FlatList
       horizontal={true}
data={this.state.dataSource}
renderItem={({ item }) => (
    <TouchableOpacity>
    <LinearGradient
    colors={['#6bc9f4', '#b0e4fc']}
    height={130}
    width={200}
    style={{
     marginHorizontal: 5,
     borderRadius: 5,
     alignItems: 'flex-start',
     padding: 15
   }}>
   <Text style={styles.eventTitle}>{item.title}</Text>
   
  </LinearGradient>
  </TouchableOpacity>
)}
enableEmptySections={true}
style={{ marginTop: 5, marginBottom: 20}}
keyExtractor={(item, index) => index.toString()}
/>
        </ScrollView>
         <Text style={styles.customTitle}>Tomorrow</Text> 
       <ScrollView horizontal={true}
       showsHorizontalScrollIndicator={false}> 
       
       <FlatList
       horizontal={true}
data={this.state.dataSource}
renderItem={({ item }) => (
    <TouchableOpacity>
    <LinearGradient
    colors={['#6bc9f4', '#b0e4fc']}
    height={130}
    width={200}
    style={{
     marginHorizontal: 5,
     borderRadius: 5,
     alignItems: 'flex-start',
     padding: 15
   }}>
   <Text style={styles.eventTitle}>{item.title}</Text>
   
  </LinearGradient>
  </TouchableOpacity>
)}
enableEmptySections={true}
style={{ marginTop: 5}}
keyExtractor={(item, index) => index.toString()}
/>
        </ScrollView>

      
      </View>
            </ScrollView>


    );
  }
}

const styles = StyleSheet.create({

  customTitle: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 28,
},

eventTitle: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 18,
},

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
  container: {
    flex: 1,
    width: 250,
    height: 150,
    margin: 20,
    margin: 15,
    marginHorizontal: 5
  },

  itemContent:  {
     flexDirection: 'row',
     borderBottomWidth: 1,
     borderColor: '#e5e5e5'
  },

  iconContainer: {
    padding: 10,
    flex: 1,
  },

  icon: {
    width: 40,
    height: 40
  },

  textContainer: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    padding: 5
  },

  downText: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  priceText: {
    flexDirection: 'row',
  },

  label: {
    textAlign: 'right',
    backgroundColor: 'yellow',
    padding: 3
  }

});