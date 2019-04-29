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
    const { navigation } = this.props;
    this.state = { recs: [], today: [], tomorrow: [], userId: this.props.screenProps.userId};
  }
  componentDidMount() {
    fetch("https://posterapp333.herokuapp.com/recs/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({recs: responseJson}));
     fetch("https://posterapp333.herokuapp.com/today/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({today: responseJson}));
      fetch("https://posterapp333.herokuapp.com/tomorrow/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({tomorrow: responseJson}));

    }
  
  refresh() {
    fetch("https://posterapp333.herokuapp.com/recs/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({recs: responseJson}));
    fetch("https://posterapp333.herokuapp.com/today/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({today: responseJson}));
    fetch("https://posterapp333.herokuapp.com/tomorrow/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({tomorrow: responseJson}));
    this.forceUpdate();
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
      <View style={{ flexDirection:"row", justifyContent: 'space-between' }}>
<Text style={styles.customTitle}>Top Picks For You</Text>  
<TouchableOpacity onPress={text => this.refresh()}>
<Text style={styles.customSubtitle2}>Refresh</Text>
</TouchableOpacity>
</View>

       <ScrollView horizontal={true}
       showsHorizontalScrollIndicator={false}> 
       
       <FlatList
       horizontal={true}
data={this.state.recs}
renderItem={({ item }) => (

<TouchableOpacity onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation", eventId: item.id, userId: this.props.screenProps.userId})}>

    <LinearGradient
    colors={['#47e5bc', '#a2efdb']}
    height={220}
    width={240}
    style={{
     marginHorizontal: 5,
     borderRadius: 10,
     alignItems: 'center',
     padding: 30
   }}>
   <View style={styles.container}>
   <Text style={styles.recTitle}>{item.title}</Text>
   <Text style = {styles.recSubtitle}> {item.startDate.substring(5,7)}/{item.startDate.substring(8,10)}
   {"  ║  ◷ "}{item.startDate.substring(11,16)}</Text>
   <Text style = {styles.recDetails}>{"meet @ "} {item.location} </Text>
   <Text style = {styles.recDetails}> {item.desc.substring(11,item.desc.length-2)} </Text>
   <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
  <Icon
      name='users'
      type='feather'
      color='black'
      size = {15}
      />
    <Text style = {styles.recDetails}>{"  "}{item.capacity-item.numberJoined} of {item.capacity} slots available</Text>
             </View>

     </View>

  </LinearGradient>
  </TouchableOpacity>
)}
enableEmptySections={true}
style={{ marginTop: 5, marginBottom: 20}}
keyExtractor={(item, index) => index.toString()}
/>
        </ScrollView>

      <Text style={styles.customTitle}>Today</Text> 
      
       <FlatList
       horizontal={true}
data={this.state.today}
renderItem={({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation", eventId: item.id, userId: this.props.screenProps.userId})}>
       <LinearGradient
    colors={['#6bc9f4', '#b0e4fc']}
    minHeight={10}
    minWidth={10}
    style={{
     marginHorizontal: 5,
     borderRadius: 10,
     alignItems: 'center',
     padding: 15
   }}>
   <Text style={styles.eventTitle}>{item.title}</Text>
    <Text>{item.location}</Text>
   <Text>◷ {item.startDate.substring(11,16)}</Text>
  </LinearGradient>
  </TouchableOpacity>
)}
enableEmptySections={true}
style={{ marginTop: 5, marginBottom: 20}}
keyExtractor={(item, index) => index.toString()}
/>
         <Text style={styles.customTitle}>Tomorrow</Text> 
       <FlatList
       horizontal={true}
    data={this.state.tomorrow}
    renderItem={({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate("EventDetail", { topic: "React Navigation", eventId: item.id, userId: this.props.screenProps.userId})}>
    <LinearGradient
    colors={['#6bc9f4', '#b0e4fc']}
    minHeight={10}
    minWidth={10}
    style={{
     marginHorizontal: 5,
     borderRadius: 10,
     alignItems: 'center',
     padding: 15
   }}>
   <Text style={styles.eventTitle}>{item.title}</Text>
    <Text>{item.location}</Text>
   <Text>◷ {item.startDate.substring(11,16)}</Text>
  </LinearGradient>
  </TouchableOpacity>
)}
enableEmptySections={true}
style={{ marginTop: 5}}
keyExtractor={(item, index) => index.toString()}
/>    
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

  customTitle2: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 10,
},

eventTitle: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 18,
},

recTitle: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 22,
  marginBottom: 10,
},

recSubtitle: {
  ...iOSUIKit.subheadObject,
  fontSize: 18,
  marginBottom: 5,
},

customSubtitle2: {
  ...iOSUIKit.title3Object,
  fontSize: 14,
      marginTop: 10
},

recDetails: {
  ...iOSUIKit.subheadObject,
  fontSize: 16,
  marginBottom: 5,
  textAlign: 'center'
},

recDetailsWhite: {
  ...iOSUIKit.subheadObject,
  fontSize: 16,
  marginBottom: 5,
  color: 'white'
},

joinButton: {
    marginTop:10,
      height:40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      marginBottom:20,
      width:200,
      borderRadius:20,
      backgroundColor: "#ff1493",
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
    justifyContent: "center",
    alignItems: "center",
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
