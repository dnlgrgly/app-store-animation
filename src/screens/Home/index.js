/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import styles from './styles';

export default class Home extends Component {
  componentWillMount() {
    console.log('component mounted');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text isBlack style={styles.welcome}>
          WELCOME
        </Text>
      </View>
    );
  }
}
