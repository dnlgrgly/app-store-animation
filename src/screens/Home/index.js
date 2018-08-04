import React, { Component } from 'react';
import {
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Text } from '@components';
import { Images } from '@assets';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const images = [
  { id: 1, src: Images.nyc, text: 'EXPLORE NEW YORK' },
  { id: 2, src: Images.candy, text: 'BEST OF APP STORE' },
];

export default class Home extends Component {
  componentWillMount() {
    console.log('component mounted');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text isBold style={{ padding: 20, paddingBottom: 0, fontSize: 34 }}>
            Demo
          </Text>
          {images.map(image => (
            <TouchableWithoutFeedback key={image.id}>
              <Animated.View
                style={{
                  height: SCREEN_HEIGHT - 150,
                  width: SCREEN_WIDTH,
                  padding: 15,
                }}
              >
                <ImageBackground
                  source={image.src}
                  style={styles.card}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <Text isBlack style={styles.cardText}>
                    {image.text}
                  </Text>
                </ImageBackground>
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
