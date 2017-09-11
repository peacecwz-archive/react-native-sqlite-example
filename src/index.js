import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import Data from './data'
var service = new Data()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      records: []
    }

    service.init()
  }

  async componentWillMount() {
    service.createTable("aloha", [{
      name: 'id',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT'
    }, {
      name: 'name',
      dataType: 'text'
    }, {
      name: 'gender',
      dataType: 'text'
    }])
    service.insert("aloha", {
      name: 'Selim',
      gender: 'male'
    })
    var result = await service.select("aloha")
    this.setState({
      records: result
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.records}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});