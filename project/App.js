import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {SQLite} from 'expo';

const database = SQLite.openDatabase('events.db');

export default class App extends React.Component {
  /* Creates the table if it doesn't exist */
  componentDidMount() {
    database.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS events (Description text, Creator text, Date date, StartTime text, EndTime text, Capacity int, Location text, Tags text);')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This text is currently irrelevant</Text>
      </View>
    );
  }

  addEvent(desc, creator, date, start, end, capacity, loc, tags) {
    database.transaction(tx => {
      tx.executeSql('INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [desc, creator, date, start, end, capacity, loc, tags])
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
