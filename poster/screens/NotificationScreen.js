import React, {Component} from 'react';
import { Animated, AppRegistry, Dimensions, ListView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, ScrollView, FlatList } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography';
import { SearchBar, Button, Icon, Card } from 'react-native-elements';
import { Constants } from 'expo';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      newMessages: [],
      userId: this.props.screenProps.userId
    };
  }
  
  componentDidMount() {
    this.reload();
  }

  reload() {
   fetch("https://posterapp333.herokuapp.com/notifications/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({notifications: responseJson}));
   fetch("https://posterapp333.herokuapp.com/newMessages/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({newMessages: responseJson}));
  }

  ListEmptyEvents = () => {
    return (
        <Text>No new notifications from your events.</Text>
    );
  };

  ListEmptyChats = () => {
    return (
        <Text>No new notifications from your chats.</Text>
    );
  };

  render() {
    return (
       <View style={styles.viewStyle}>
      <Text style={styles.customTitle}>Notifications</Text>
      <ScrollView>
      <Text style={styles.customSubtitle}>About Your Events</Text>
          <FlatList
            data={this.state.notifications}
            renderItem={ (data) => (
              <TouchableHighlight
                style={styles.rowFrontJoin}
                underlayColor={'#ffffff'}>
                <View>
                  <View style={{ flexDirection:"row" }}>
                  <Icon
                    name='user'
                    type='feather'
                    size = {20}
                    />
                  <Text>  A new user joined {data.item.title}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            ListEmptyComponent={this.ListEmptyEvents}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.customSubtitle2}>About Your Chats</Text>
          <FlatList
            data={this.state.newMessages}
            renderItem={ (data) => (
              <TouchableHighlight
                style={styles.rowFrontChat}
                underlayColor={'#ffffff'}>
                <View>
                <View style={{ flexDirection:"row" }}>
                <Icon
                  name='message-circle'
                  type='feather'
                  size = {20}
                  />
                  <Text>  You have a new message in the group chat for {data.item.title}</Text>
                </View>
                </View>
              </TouchableHighlight>
            )}
            ListEmptyComponent={this.ListEmptyChats}
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
  customTitle: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 28,
  marginBottom: 10
},
  viewStyle: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    margin: 15,
    textAlign: 'center',
    marginTop: Constants.statusBarHeight + 10
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  rowFrontJoin: {
    backgroundColor: '#ffe066',
    justifyContent: 'center',
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 5
  },

  customSubtitle: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 20,
  marginTop: 10
},

customSubtitle2: {
  ...iOSUIKit.subheadEmphasizedObject,
  fontSize: 20,
  marginTop: 30
},

  rowFrontChat: {
    backgroundColor: '#f58a00',
    justifyContent: 'center',
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 5
  },
});
