import React, {Component} from 'react';
import { Animated, AppRegistry, Dimensions, ListView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography';
import { SearchBar, Button, Icon, Card } from 'react-native-elements';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [], 
      messages: [],
      userId: this.props.screenProps.userId
    };
  }

  componentDidMount() {
   fetch("https://posterapp333.herokuapp.com/notifications/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({notifications: responseJson}));
   fetch("https://posterapp333.herokuapp.com/newMessages/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({messages: responseJson}));
  }

  deleteNotificationRow(rowKey) {
    const newData = [...this.state.notifications];
    // const prevIndex = this.state.notifications.findIndex(item => item.key === rowKey);
    const prevIndex = newData.indexOf(rowKey);
    newData.splice(prevIndex, 1);
    this.setState({notifications: newData});
  }

  deleteMessagesRow(rowKey) {
    const newData = [...this.state.messages];
    // const prevIndex = this.state.notifications.findIndex(item => item.key === rowKey);
    const prevIndex = newData.indexOf(rowKey);
    newData.splice(prevIndex, 1);
    this.setState({messages: newData});
  }

  render() {
    return (
       <View style={styles.viewStyle}>
      <Text style={styles.customTitle}>Notifications</Text>
          <SwipeListView
            useFlatList
            data={this.state.notifications}
            renderItem={ (data) => (
              <TouchableHighlight
                style={styles.rowFront}
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
            renderHiddenItem={ (data) => (
              <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteNotificationRow(data.item.key)}>
                <Text style = {{textAlign: 'center', color: 'white'}}>Clear</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
          />
          <SwipeListView
            useFlatList
            data={this.state.newMessages}
            renderItem={ (data) => (
              <TouchableHighlight
                style={styles.rowFront}
                underlayColor={'#ffffff'}>
                <View>
                <View style={{ flexDirection:"row" }}>
                <Icon
                  name='message-circle'
                  type='feather'
                  size = {20}
                  />
                  <Text>  You have a new message in the {data.item.title} chat</Text>
                </View>
                </View>
              </TouchableHighlight>
            )}
            renderHiddenItem={ (data) => (
              <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteMessagesRow(data.item.key)}>
                <Text style = {{textAlign: 'center', color: 'white'}}>Clear</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
          />
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
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  rowFront: {
    backgroundColor: '#f7eedc',
    justifyContent: 'center',
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 5
  },
  rowBack: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5

  },
  backRightBtn: {
    bottom: 0,
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderRadius: 10
  },
  backRightBtnRight: {
    textAlign: 'center',
    backgroundColor: 'red',
    right: 0,
    borderRadius: 10
  },
});