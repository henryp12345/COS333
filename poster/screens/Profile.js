import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography'
import { Card } from 'native-base';
import { LinearGradient } from 'expo';

export default class Profile extends Component {

  constructor(props) {
    super(props)
    const {navigation} = this.props;
    this.state = { hosted: [], joined: [], userId: this.props.screenProps.userId }
  }
  
  componentDidMount() {
    fetch("https://posterapp333.herokuapp.com/hosted/" + this.state.userId + "/")
      .then(response => response.json())
      .then(responseJson => this.setState({hosted: responseJson}));
    fetch("https://posterapp333.herokuapp.com/joined/" + this.state.userId + "/")
      .then(response => response.json())
      .then(responseJson => this.setState({joined: responseJson}));
  }
  
  componentDidUpdate() {
    
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
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
      <Text style={styles.customTitle}>{"Welcome back, "}{this.state.userId}.</Text>
      <ScrollView>
      <Text style={styles.customSubtitle}>Events You are Hosting</Text>
      <FlatList
        data={this.state.hosted}
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

              <TouchableOpacity style={styles.textStyle}
              onPress={() => this.props.navigation.navigate("Room", {topic: "React Navigation", roomId: item.chatroom, userId: this.state.userId})}>
              <Icon name='comment'
                    type='font-awesome'
                    color='#00bfff'
                    size={30}/>
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
        keyExtractor={(item, index) => index.toString()}/>
      
      <Text style={styles.customSubtitle}>Events You Have Joined</Text>

      <FlatList
        data={this.state.joined}
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

              <TouchableOpacity style={styles.textStyle}
              onPress={() => this.props.navigation.navigate("Room", {topic: "React Navigation", roomId: item.chatroom, userId: this.state.userId})}>
              <Icon name='comment'
                    type='font-awesome'
                    color='#00bfff'
                    size={30}/>
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
        keyExtractor={(item, index) => index.toString()}/>

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
