import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
    this.borderRadius = new Animated.Value(20);
    this.cardHeight = new Animated.Value(SCREEN_HEIGHT - 200);
    this.cardWidth = new Animated.Value(SCREEN_WIDTH);
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
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.cardWidth, {
                toValue: dWidth,
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.cardHeight, {
                toValue: dHeight,
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.borderRadius, {
                toValue: 0,
                easing: Easing.back(),
                duration: 250,
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 250,
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
        easing: Easing.back(),
        duration: 250,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        easing: Easing.back(),
        duration: 250,
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        easing: Easing.back(),
        duration: 250,
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        easing: Easing.back(),
        duration: 250,
      }),
      Animated.timing(this.cardWidth, {
        toValue: SCREEN_WIDTH,
        easing: Easing.back(),
        duration: 250,
      }),
      Animated.timing(this.cardHeight, {
        toValue: SCREEN_HEIGHT - 200,
        easing: Easing.back(),
        duration: 250,
      }),
      Animated.timing(this.borderRadius, {
        toValue: 20,
        easing: Easing.back(),
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
      borderRadius: this.borderRadius,
    };

    const animatedContainerStyle = {
      width: this.cardWidth,
      height: this.cardHeight,
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

    const { activeImage } = this.state;

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
              <Animated.View
                style={[styles.cardContainer, animatedContainerStyle]}
              >
                <Image
                  ref={image => {
                    this.allImages[index] = image;
                  }}
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
          pointerEvents={activeImage ? 'auto' : 'none'}
        >
          <View
            style={{ flex: 2, zIndex: 1001 }}
            ref={view => {
              this.viewImage = view;
            }}
          >
            <Animated.Image
              source={activeImage ? activeImage.src : null}
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
          {/*
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
              {'Bacon Ipsum'}
            </Text>
            <Text>
              Bacon ipsum dolor amet hamburger pork loin ground round cow beef
              spare ribs. Bresaola andouille beef ribeye turducken t-bone
              sausage. Pork belly corned beef rump strip steak ball tip sausage
              doner swine shankle frankfurter pork chop.
            </Text>
          </Animated.View>
          */}
        </View>
      </SafeAreaView>
    );
  }
}
