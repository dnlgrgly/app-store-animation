import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Text } from '@components';
import { Images } from '@assets';
import styles from './styles';

const images = [
  { id: 1, src: Images.nyc, text: 'EXPLORE NEW YORK' },
  { id: 2, src: Images.candy, text: 'BEST OF APP STORE' },
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeImage: null,
    };
  }

  componentWillMount() {
    this.allImages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
    this.activeImageStyle = null;
  }

  openImage = index => {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;

      this.position.setValue({
        x: pageX,
        y: pageY,
      });

      this.dimensions.setValue({
        x: width,
        y: height,
      });

      this.setState(
        {
          activeImage: images[index],
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 300,
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 300,
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 300,
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 300,
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 300,
              }),
            ]).start();
          });
        }
      );
    });
  };

  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250,
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250,
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250,
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250,
      }),
    ]).start(() => {
      this.setState({
        activeImage: null,
      });
    });
  };

  render() {
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y,
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0],
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY,
        },
      ],
    };

    const animatedCrossOpacity = {
      opacity: this.animation,
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text isBold style={{ padding: 20, paddingBottom: 0, fontSize: 34 }}>
            Demo card
          </Text>
          {images.map((image, index) => (
            <TouchableWithoutFeedback
              onPress={() => this.openImage(index)}
              key={image.id}
            >
              <Animated.View style={styles.cardContainer}>
                <Image
                  ref={image => (this.allImages[index] = image)}
                  source={image.src}
                  style={styles.card}
                />
                <Text isBlack style={styles.cardText}>
                  {image.text}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? 'auto' : 'none'}
        >
          <View
            style={{ flex: 2, zIndex: 1001 }}
            ref={view => (this.viewImage = view)}
          >
            <Animated.Image
              source={
                this.state.activeImage ? this.state.activeImage.src : null
              }
              style={[
                {
                  resizeMode: 'cover',
                  top: 0,
                  left: 0,
                  height: null,
                  width: null,
                },
                activeImageStyle,
              ]}
            />
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View
                style={[
                  { position: 'absolute', top: 30, right: 30 },
                  animatedCrossOpacity,
                ]}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}
                >
                  X
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                zIndex: 1000,
                backgroundColor: 'white',
                padding: 20,
                paddingTop: 50,
              },
              animatedContentStyle,
            ]}
          >
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>
              Bacon Ipsum
{' '}
            </Text>
            <Text>
              Bacon ipsum dolor amet hamburger pork loin ground round cow beef
              spare ribs. Bresaola andouille beef ribeye turducken t-bone
              sausage. Pork belly corned beef rump strip steak ball tip sausage
              doner swine shankle frankfurter pork chop.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}
