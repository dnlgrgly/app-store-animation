import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardContainer: {
    height: SCREEN_HEIGHT - 150,
    width: SCREEN_WIDTH,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 7.5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    padding: 20,
  },
  cardText: {
    color: 'white',
    fontSize: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.75,
    left: 45,
  },
});
