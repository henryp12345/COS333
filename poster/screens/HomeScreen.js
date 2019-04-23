import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'native-base';
import { LinearGradient } from 'expo';
import { iOSUIKit } from 'react-native-typography'


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
      <Text style={styles.customTitle}>Browse Events</Text>

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
      <View style={{ flexDirection:"row", justifyContent: 'space-between' }}>
      <Text style={styles.customSubtitle}>Popular Categories</Text>
<TouchableOpacity onPress={text => this.SearchFilterFunction('')}>
<Text style={styles.customSubtitle2}>Clear All</Text>
</TouchableOpacity>
</View>
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
<View style={{ flexDirection:"row", justifyContent: 'space-between' }}>
<Text style={styles.customSubtitle}>Happenings</Text>
<TouchableOpacity onPress={text => this.SearchFilterFunction('')}>
<Text style={styles.customSubtitle2}>See All</Text>
</TouchableOpacity>
</View>
<FlatList
data={this.state.dataSource}
renderItem={({ item }) => (

<Card style={{borderRadius: 10}}>
<View style={styles.itemContent}>
<View style={styles.iconContainer}>
<Text style={styles.dateText}>{item.startDate.substring(5,7)}/{item.startDate.substring(8,10)}</Text>
</View>
<View style={styles.textContainer}>
<View style={styles.titleContainer}>
<Text style={styles.eventTitle}>{item.title}</Text>
<Text style={{marginRight: 10}}>Posted by {item.host}</Text>
<Text style={{marginRight: 10}}>{item.capacity-item.numberJoined} of {item.capacity} slots available</Text>

</View>

<View style={styles.downTextContainer}>
<View style={styles.downTextContainerInner}>
<View style={styles.downText}>
<View style={styles.priceText}>
</View>

<View style={styles.label}>

<TouchableOpacity onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation", eventId: item.id, userId: 'Henry'})}>
<Icon
name='plus-circle'
type='font-awesome'
size={28}
color="#558fed"
/>
</TouchableOpacity>

</View>
</View>
</View>
</View>
</View>
</View>



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
 customTitle: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 28,
},
customSubtitle: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 20,
},

customSubtitle2: {
  ...iOSUIKit.title3Object,
  fontSize: 14,
},

eventTitle: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 18,
},

dateText: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 18,
  color: 'white',
  textAlign: 'center',

},

textStyle: {
  padding: 5,
  textAlign: 'left',
},

rightText: {
  textAlign: 'right',
},
container: {
  marginBottom: 15,
},

itemContent:  {
 flexDirection: 'row',
 borderBottomWidth: 1,
 borderColor: '#e5e5e5',
 minHeight: 75
},

iconContainer: {
  padding: 5,
  flex: 1,
  borderRadius: 5,
  backgroundColor: '#558fed',
  justifyContent: 'center',
},

textContainer: {
  padding: 10,
  flex: 5,
},

downTextContainer: {
  flex: 6,
  position: 'relative',
},

downTextContainerInner: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
},

downText: {
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
},

priceText: {
  flexDirection: 'row',
},

label: {
  textAlign: 'right',
  padding: 3
}

});
